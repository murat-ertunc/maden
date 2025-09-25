<?php

namespace App\Http\Controllers;

use App\Models\Mine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TunnelController extends Controller
{
    /**
     * Tunnel Designer ana sayfası
     */
    public function index()
    {
        $mines = Mine::where('user_id', Auth::id())
            ->with(['paths'])
            ->orderBy('created_at', 'desc')
            ->get();

        return view('tunnel.index', compact('mines'));
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
     * Tunnel Designer test sayfası
     */
    public function test()
    {
        return view('tunnel.test');
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
                        'gojs_data' => $segmentForStore
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
            'measurements' => []
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
                $tunnelData['segments'][] = $seg;
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