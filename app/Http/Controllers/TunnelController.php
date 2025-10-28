<?php

namespace App\Http\Controllers;

use App\DataTransferObjects\BeaconReading as BeaconReadingDTO;
use App\Models\BeaconReading;
use App\Models\Mine;
use App\Models\MinePath;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TunnelController extends Controller
{
    private const PIXELS_PER_METER = 20;

    /**
     * Tunnel Designer ana sayfası
     */
    public function index()
    {
        $mines = Mine::where('user_id', Auth::id())
            ->with(['paths'])
            ->orderBy('created_at', 'desc')
            ->get();

        $rssiMap = config('mining.rssi_map', []);
        $gatewayRefs = config('mining.gateways', []);
        $beaconPollInterval = (int) config('mining.poll_interval_ms', 10000);

        return view('tunnel.index', compact('mines', 'rssiMap', 'gatewayRefs', 'beaconPollInterval'));
    }

    /**
     * Enhanced Tunnel Designer sayfası
     */
    public function enhanced()
    {
        $mines = Mine::where('user_id', Auth::id())
            ->with(['paths'])
            ->orderBy('created_at', 'desc')
            ->get();

        return view('tunnel.enhanced', compact('mines'));
    }



    /**
     * API: Latest beacon readings from database
     */
    public function latestBeacons(Request $request)
    {
        $mineId = $request->integer('mine_id');
        $gateways = [];
        $minutes = $request->integer('minutes', 10); // Last X minutes, default 10

        // Get gateway coordinates if mine_id is provided
        if ($mineId) {
            $mine = Mine::where('id', $mineId)
                ->where('user_id', Auth::id())
                ->with('paths')
                ->first();

            if ($mine) {
                $gateways = $this->collectGatewayCoordinates($mine);
            }
        }

        // Get latest beacon readings from database
        $beaconReadings = BeaconReading::latestForMine($mineId, $minutes);

        // Convert to DTO format for frontend compatibility
        $readings = [];
        foreach ($beaconReadings as $reading) {
            $readings[] = [
                'beacon_id' => $reading->beacon_id,
                'gateway_id' => $reading->gateway_id,
                'rssi' => $reading->rssi,
                'timestamp' => $reading->reading_timestamp->toISOString(),
            ];
        }

        // Convert to DTO if DTO class expects it
        $dto = array_map(static fn (array $reading) => BeaconReadingDTO::fromArray($reading)->toArray(), $readings);

        return response()->json([
            'data' => $dto,
            'gateways' => $gateways,
            'meta' => [
                'mine_id' => $mineId,
                'generated_at' => now()->toISOString(),
                'source' => 'database',
                'time_range_minutes' => $minutes,
                'reading_count' => count($readings),
                'active_beacons' => collect($readings)->pluck('beacon_id')->unique()->count(),
                'active_gateways' => collect($readings)->pluck('gateway_id')->unique()->count(),
            ],
        ]);
    }

    /**
     * API: Get last reading for a specific beacon (no time limit)
     */
    public function lastBeaconReading(Request $request, string $beaconId)
    {
        $mineId = $request->integer('mine_id');
        $gateways = [];

        // Get gateway coordinates if mine_id is provided
        if ($mineId) {
            $mine = Mine::where('id', $mineId)
                ->where('user_id', Auth::id())
                ->with('paths')
                ->first();

            if ($mine) {
                $gateways = $this->collectGatewayCoordinates($mine);
            }
        }

        // Get all readings for this beacon (ordered by most recent)
        $beaconReadings = BeaconReading::lastReadingForBeacon($beaconId);

        // Convert to DTO format for frontend compatibility
        $readings = [];
        foreach ($beaconReadings as $reading) {
            $readings[] = [
                'beacon_id' => $reading->beacon_id,
                'gateway_id' => $reading->gateway_id,
                'rssi' => $reading->rssi,
                'timestamp' => $reading->reading_timestamp->toISOString(),
                'created_at' => $reading->created_at->toISOString(),
            ];
        }

        // Convert to DTO if DTO class expects it
        $dto = array_map(static fn (array $reading) => BeaconReadingDTO::fromArray($reading)->toArray(), $readings);

        return response()->json([
            'data' => $dto,
            'gateways' => $gateways,
            'meta' => [
                'mine_id' => $mineId,
                'beacon_id' => $beaconId,
                'generated_at' => now()->toISOString(),
                'source' => 'database',
                'reading_count' => count($readings),
                'last_reading_time' => $readings ? ($readings[0]['created_at'] ?? null) : null,
            ],
        ]);
    }


    /**
     * API: Tünel verilerini kaydet
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mine_id' => 'required|exists:mines,id',
            'tunnel_data' => 'required|json'
        ]);

        $mine = Mine::where('id', $validated['mine_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Tünel verilerini parse et
        $tunnelData = json_decode($validated['tunnel_data'], true);
        
        // Mevcut tünel yollarını atomik olarak güncelle
        $saved = DB::transaction(function () use ($mine, $tunnelData) {
            // Eski tünel yollarını sil
            $deleted = $mine->paths()->where('type', 'tunnel')->delete();
            
            $count = 0;
            foreach ($tunnelData['segments'] as $idx => $segment) {
                // Kalıcı kolonlar için NULL gönderilmesini engelle (DB NOT NULL + default var)
                $width = isset($segment['width']) ? (float) $segment['width'] : 3.0;
                $height = isset($segment['height']) ? (float) $segment['height'] : 3.0;
                $material = $segment['material'] ?? 'concrete';
                $tunnelType = $segment['tunnelType'] ?? 'main';
                $color = $this->getTunnelColor($tunnelType);

                // gojs_data içerisine de varsayılanları yedir (round-trip tutarlılık)
                $segmentForStore = $segment;
                $segmentForStore['width'] = $width;
                $segmentForStore['height'] = $height;
                $segmentForStore['material'] = $material;
                $segmentForStore['tunnelType'] = $tunnelType;
                $segmentForStore['color'] = $color;
                
                // Bu segment'e ait gateway'leri filtrele
                $segmentGateways = [];
                if (isset($tunnelData['gateways'])) {
                    foreach ($tunnelData['gateways'] as $gateway) {
                        if (isset($gateway['segmentKey']) && $gateway['segmentKey'] === $segment['key']) {
                            $segmentGateways[] = $gateway;
                        }
                    }
                }

                $mine->paths()->create([
                    'name' => $segment['name'] ?? 'TUNNEL',
                    'description' => 'GoJS Tunnel Designer ile oluşturuldu',
                    'type' => 'tunnel',
                    'path_points' => $this->convertSegmentToPathPoints($segment),
                    'properties' => [
                        'width' => $width,
                        'height' => $height,
                        'cross_section_type' => $segment['crossSectionType'] ?? 'circle',
                        'material' => $material,
                        'tunnel_type' => $tunnelType,
                        'angle' => $segment['angle'] ?? 0,
                        'length' => $segment['length'] ?? 0,
                        'gojs_data' => $segmentForStore,
                        'gateways' => $segmentGateways
                    ],
                    'status' => 'active',
                    'width' => $width,
                    'height' => $height,
                    'material' => $material,
                    'color' => $color,
                    'order' => $idx
                ]);
                $count++;
            }
            return [$deleted, $count];
        });

        return response()->json([
            'success' => true,
            'message' => 'Tünel verileri başarıyla kaydedildi',
            'segments_saved' => $saved[1] ?? 0
        ]);
    }

    /**
     * API: Mine'ın tünel verilerini getir
     */
    public function getTunnelData(Mine $mine)
    {
        $this->authorize('view', $mine);

        $paths = $mine->paths()
            ->where('type', 'tunnel')
            ->orderBy('order')
            ->get();

        $tunnelData = [
            'segments' => [],
            'stations' => [],
            'measurements' => [],
            'gateways' => []
        ];

        foreach ($paths as $path) {
            if (isset($path->properties['gojs_data'])) {
                $seg = $path->properties['gojs_data'];
                // Varsayılanları doldur
                $seg['width'] = $seg['width'] ?? (float)($path->width ?? 3.0);
                $seg['height'] = $seg['height'] ?? (float)($path->height ?? 3.0);
                $seg['material'] = $seg['material'] ?? ($path->material ?? 'concrete');
                $seg['tunnelType'] = $seg['tunnelType'] ?? ($path->properties['tunnel_type'] ?? 'main');
                $seg['crossSectionType'] = $seg['crossSectionType'] ?? ($path->properties['cross_section_type'] ?? 'circle');
                $seg['length'] = $seg['length'] ?? ($path->properties['length'] ?? 0);
                $tunnelData['segments'][] = $seg;
                
                // Load gateways for this segment
                if (isset($path->properties['gateways'])) {
                    foreach ($path->properties['gateways'] as $gateway) {
                        $tunnelData['gateways'][] = $gateway;
                    }
                }
            } else {
                // Legacy format dönüştürme
                $tunnelData['segments'][] = $this->convertPathToSegment($path);
            }
        }

        return response()->json($tunnelData);
    }

    /**
     * API: Raspberry Pi'den gelen miner pozisyon verilerini al
     */
    public function receiveMinerPosition(Request $request)
    {
        $validated = $request->validate([
            'mine_id' => 'required|exists:mines,id',
            'miner_id' => 'required|string',
            'position' => 'required|array',
            'position.x' => 'required|numeric',
            'position.y' => 'required|numeric',
            'position.z' => 'required|numeric',
            'timestamp' => 'required|date',
            'signal_strength' => 'nullable|numeric'
        ]);

        // Mine erişim kontrolü
        $mine = Mine::where('id', $validated['mine_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Miner position verilerini cache'e kaydet (geçici depolama)
        $cacheKey = "miner_position:{$mine->id}:{$validated['miner_id']}";
        cache()->put($cacheKey, [
            'position' => $validated['position'],
            'timestamp' => $validated['timestamp'],
            'signal_strength' => $validated['signal_strength'] ?? 100,
            'mine_id' => $mine->id,
            'miner_id' => $validated['miner_id']
        ], now()->addMinutes(10)); // 10 dakika cache

        // WebSocket ile canlı güncellemeleri tetikle (opsiyonel)
        // broadcast(new MinerPositionUpdated($mine, $validated));

        return response()->json([
            'success' => true,
            'message' => 'Miner pozisyonu alındı',
            'cached_until' => now()->addMinutes(10)->toISOString()
        ]);
    }

    /**
     * API: Anlık miner pozisyonlarını getir
     */
    public function getMinerPositions(Mine $mine)
    {
        $this->authorize('view', $mine);

        $cachePattern = "miner_position:{$mine->id}:*";
        $positions = [];

        // Cache'den tüm miner pozisyonlarını al
        // Not: Bu basit bir implementasyon, production'da Redis pattern matching kullanılabilir
        $miners = cache()->get("miners_list:{$mine->id}", []);
        
        foreach ($miners as $minerId) {
            $cacheKey = "miner_position:{$mine->id}:{$minerId}";
            $position = cache()->get($cacheKey);
            
            if ($position) {
                $positions[] = $position;
            }
        }

        return response()->json([
            'mine_id' => $mine->id,
            'positions' => $positions,
            'total_miners' => count($positions),
            'last_updated' => now()->toISOString()
        ]);
    }

    private function collectGatewayCoordinates(Mine $mine): array
    {
        $result = [];
        $paths = $mine->paths ?? $mine->paths()->get();

        foreach ($paths as $path) {
            $gateways = data_get($path->properties, 'gateways', []);
            if (!is_array($gateways)) {
                continue;
            }

            foreach ($gateways as $gateway) {
                if (!is_array($gateway)) {
                    continue;
                }

                $gatewayId = $this->extractGatewayId($gateway);
                if (!$gatewayId || isset($result[$gatewayId])) {
                    continue;
                }

                $point = $this->resolveGatewayPoint($gateway, $path);
                if (!$point) {
                    continue;
                }

                $result[$gatewayId] = [
                    'x' => $point['x'],
                    'y' => $point['y'],
                    'segment_key' => $gateway['segmentKey'] ?? $gateway['segment_key'] ?? null,
                    'path_id' => $path->id,
                ];
            }
        }

        return $result;
    }

    private function extractGatewayId(array $gateway): ?string
    {
        foreach (['gateway_id', 'gatewayId', 'id', 'identifier', 'code'] as $key) {
            if (!empty($gateway[$key])) {
                return (string) $gateway[$key];
            }
        }

        return null;
    }

    private function resolveGatewayPoint(array $gateway, MinePath $path): ?array
    {
        $position = $gateway['position'] ?? $gateway['pos'] ?? null;
        if ($position) {
            $point = $this->parseGoPointToMeters($position);
            if ($point) {
                return $point;
            }
        }

        if (isset($gateway['meterage']) && is_numeric($gateway['meterage'])) {
            $point = $this->pointAlongPath((float) $gateway['meterage'], $path->path_points ?? []);
            if ($point) {
                return $point;
            }
        }

        return null;
    }

    private function parseGoPointToMeters(mixed $value): ?array
    {
        if (is_string($value)) {
            $parts = preg_split('/\s+/', trim($value));
            if (count($parts) >= 2) {
                $x = (float) $parts[0] / self::PIXELS_PER_METER;
                $y = (float) $parts[1] / self::PIXELS_PER_METER;
                return ['x' => $x, 'y' => $y];
            }
        }

        if (is_array($value)) {
            if (isset($value['x'], $value['y'])) {
                return [
                    'x' => (float) $value['x'] / self::PIXELS_PER_METER,
                    'y' => (float) $value['y'] / self::PIXELS_PER_METER,
                ];
            }

            if (isset($value['x'], $value['z'])) {
                return [
                    'x' => (float) $value['x'],
                    'y' => (float) $value['z'],
                ];
            }
        }

        return null;
    }

    private function pointAlongPath(float $meterage, ?array $points): ?array
    {
        if (!$points || count($points) < 2) {
            return null;
        }

        $remaining = $meterage;

        for ($index = 1; $index < count($points); $index++) {
            $start = $points[$index - 1];
            $end = $points[$index];

            $startX = (float) ($start['x'] ?? 0);
            $startZ = (float) ($start['z'] ?? 0);
            $endX = (float) ($end['x'] ?? 0);
            $endZ = (float) ($end['z'] ?? 0);

            $segmentLength = hypot($endX - $startX, $endZ - $startZ);
            if ($segmentLength <= 0.0) {
                continue;
            }

            if ($remaining <= $segmentLength) {
                $ratio = $remaining / $segmentLength;
                return [
                    'x' => $startX + ($endX - $startX) * $ratio,
                    'y' => $startZ + ($endZ - $startZ) * $ratio,
                ];
            }

            $remaining -= $segmentLength;
        }

        $last = end($points);
        if (is_array($last)) {
            return [
                'x' => (float) ($last['x'] ?? 0),
                'y' => (float) ($last['z'] ?? 0),
            ];
        }

        return null;
    }

    /**
     * Segment verilerini path points formatına dönüştür
     */
    private function convertSegmentToPathPoints($segment)
    {
        // GoJS segment verilerinden 3D path points oluştur
        // Öncelik: from/to uçları (metre) -> yoksa position(orta) + length/angle
        $hasEndpoints = isset($segment['from']) && isset($segment['to']);

        if ($hasEndpoints) {
            $from = explode(' ', $segment['from']);
            $to = explode(' ', $segment['to']);
            $sx = floatval($from[0]) / 20.0;
            $sz = floatval($from[1]) / 20.0;
            $ex = floatval($to[0]) / 20.0;
            $ez = floatval($to[1]) / 20.0;
            return [
                ['x' => $sx, 'y' => 0, 'z' => $sz],
                ['x' => $ex, 'y' => 0, 'z' => $ez],
            ];
        }

        // Fallback: position (midpoint) + length + angle
        $position = explode(' ', $segment['position']);
        $mx = floatval($position[0]);
        $mz = floatval($position[1]);
        $length = floatval($segment['length'] ?? 0);
        $angleDeg = floatval($segment['angle'] ?? 0);
        $angle = deg2rad($angleDeg);
        $half = ($length * 20.0) / 2.0; // px
        // orta nokta px iken metreye çevirirken sonunda böleriz
        $dx = cos($angle) * $half;
        $dz = sin($angle) * $half;
        $sx = ($mx - $dx) / 20.0; // m
        $sz = ($mz - $dz) / 20.0;
        $ex = ($mx + $dx) / 20.0;
        $ez = ($mz + $dz) / 20.0;

        return [
            ['x' => $sx, 'y' => 0, 'z' => $sz],
            ['x' => $ex, 'y' => 0, 'z' => $ez],
        ];
    }

    /**
     * Path verilerini segment formatına dönüştür (legacy support)
     */
    private function convertPathToSegment($path)
    {
        $points = $path->path_points;
        $startPoint = $points[0] ?? ['x' => 0, 'y' => 0, 'z' => 0];
        $endPoint = $points[1] ?? ['x' => 0, 'y' => 0, 'z' => 0];
        
        $dx = $endPoint['x'] - $startPoint['x'];
        $dz = $endPoint['z'] - $startPoint['z'];
        $length = sqrt($dx * $dx + $dz * $dz);
        $angle = atan2($dz, $dx) * 180 / M_PI;

        // Orta nokta px cinsinden
        $midX = (($startPoint['x'] + $endPoint['x']) / 2) * 20;
        $midZ = (($startPoint['z'] + $endPoint['z']) / 2) * 20;

        return [
            'key' => $path->id,
            'category' => 'tunnel_segment',
            'name' => $path->name,
            'from' => ($startPoint['x'] * 20) . ' ' . ($startPoint['z'] * 20),
            'to' => ($endPoint['x'] * 20) . ' ' . ($endPoint['z'] * 20),
            'position' => $midX . ' ' . $midZ,
            'width' => (float)($path->width ?? 3.0),
            'height' => (float)($path->height ?? 3.0),
            'length' => $length,
            'angle' => $angle,
            'crossSectionType' => $path->properties['cross_section_type'] ?? 'circle',
            'material' => $path->material ?? 'concrete',
            'tunnelType' => $path->properties['tunnel_type'] ?? 'main'
        ];
    }

    /**
     * Tünel tipine göre renk döndür
     */
    private function getTunnelColor($tunnelType)
    {
        $colors = [
            'main' => '#2980b9',
            'branch' => '#27ae60',
            'emergency' => '#e74c3c',
            'ventilation' => '#3498db'
        ];

        return $colors[$tunnelType] ?? '#2980b9';
    }
}