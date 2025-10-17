<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BeaconReading;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class GatewayController extends Controller
{
    /**
     * Get HTTP request logs
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getRequestLogs(Request $request): JsonResponse
    {
        try {
            $logFile = storage_path('logs/http_requests.json');
            
            if (!file_exists($logFile)) {
                return response()->json([
                    'success' => true,
                    'message' => 'No logs found yet',
                    'logs' => []
                ]);
            }
            
            $logs = json_decode(file_get_contents($logFile), true) ?? [];
            
            // Sayfa parametrelerini al
            $page = $request->get('page', 1);
            $perPage = $request->get('per_page', 50);
            $search = $request->get('search', '');
            
            // Arama filtresi uygula
            if (!empty($search)) {
                $logs = array_filter($logs, function($log) use ($search) {
                    return str_contains(strtolower($log['url']), strtolower($search)) ||
                           str_contains(strtolower($log['method']), strtolower($search)) ||
                           str_contains(strtolower($log['path']), strtolower($search));
                });
            }
            
            // Sayfalama
            $total = count($logs);
            $offset = ($page - 1) * $perPage;
            $paginatedLogs = array_slice($logs, $offset, $perPage);
            
            return response()->json([
                'success' => true,
                'logs' => $paginatedLogs,
                'pagination' => [
                    'current_page' => $page,
                    'per_page' => $perPage,
                    'total' => $total,
                    'last_page' => ceil($total / $perPage)
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error reading request logs', [
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error reading logs: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Clear HTTP request logs
     *
     * @return JsonResponse
     */
    public function clearRequestLogs(): JsonResponse
    {
        try {
            $logFile = storage_path('logs/http_requests.json');
            
            if (file_exists($logFile)) {
                unlink($logFile);
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Request logs cleared successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error clearing logs: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store incoming gateway beacon reading data
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storeGatewayData(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            
            // Log incoming request for debugging
            Log::info('Gateway data received', [
                'ip' => $request->ip(),
                'data_keys' => array_keys($data),
                'full_data' => $data,
                'raw_content' => $request->getContent()
            ]);

            // Validate incoming data structure
            // Support both single reading and multiple readings
            $readings = [];
            
            // Check if data is sent as direct JSON array (like [{...}, {...}])
            // Laravel converts this to numeric array keys [0 => {...}, 1 => {...}]
            if (empty($data) || (isset($data[0]) && is_array($data[0]))) {
                // Get raw JSON content and decode it properly
                $rawContent = $request->getContent();
                $decodedContent = json_decode($rawContent, true);
                
                if (is_array($decodedContent)) {
                    // Check if it's an array of objects or a single object
                    if (isset($decodedContent[0]) && is_array($decodedContent[0])) {
                        $readings = $decodedContent; // Array of readings
                    } elseif (isset($decodedContent['beacon_id']) || isset($decodedContent['beaconId'])) {
                        $readings = [$decodedContent]; // Single reading
                    } else {
                        $readings = $decodedContent; // Try as-is
                    }
                }
            }
            // Check if data contains 'readings' array (batch mode)
            elseif (isset($data['readings']) && is_array($data['readings'])) {
                $readings = $data['readings'];
            }
            // Check if data contains 'data' array (alternative format)
            elseif (isset($data['data']) && is_array($data['data'])) {
                $readings = $data['data'];
            }
            // Single reading format
            elseif (isset($data['beacon_id']) || isset($data['beaconId'])) {
                $readings = [$data];
            }
            // If no recognizable format, store raw data as single reading
            else {
                $readings = [$data];
            }

            $savedCount = 0;
            $errors = [];

            DB::beginTransaction();
            
            try {
                foreach ($readings as $reading) {
                    try {
                        // Extract data with multiple possible key formats
                        $beaconId = $reading['beacon_id'] ?? $reading['beaconId'] ?? $reading['beacon'] ?? null;
                        $gatewayId = $reading['gateway_id'] ?? $reading['gatewayId'] ?? $reading['gateway'] ?? null;
                        $rssi = $reading['rssi'] ?? $reading['signal_strength'] ?? null;
                        $timestamp = $reading['timestamp'] ?? $reading['reading_timestamp'] ?? now();
                        $mineId = $reading['mine_id'] ?? $reading['mineId'] ?? $data['mine_id'] ?? null;

                        // Skip if essential data is missing
                        if (!$beaconId || !$gatewayId || $rssi === null) {
                            $errorMsg = "Missing required fields - beacon_id: " . ($beaconId ?? 'null') . 
                                      ", gateway_id: " . ($gatewayId ?? 'null') . 
                                      ", rssi: " . ($rssi ?? 'null') . 
                                      " | Full reading: " . json_encode($reading);
                            $errors[] = $errorMsg;
                            Log::warning('Missing required fields', [
                                'beacon_id' => $beaconId,
                                'gateway_id' => $gatewayId,
                                'rssi' => $rssi,
                                'reading' => $reading
                            ]);
                            continue;
                        }

                        // Create beacon reading record
                        BeaconReading::create([
                            'mine_id' => $mineId,
                            'beacon_id' => (string) $beaconId,
                            'gateway_id' => (string) $gatewayId,
                            'rssi' => (int) $rssi,
                            'reading_timestamp' => $timestamp,
                            'ip_address' => $request->ip(),
                            'raw_data' => $reading
                        ]);

                        $savedCount++;
                        
                    } catch (\Exception $e) {
                        $errors[] = "Error processing reading: " . $e->getMessage();
                        Log::warning('Error processing single beacon reading', [
                            'reading' => $reading,
                            'error' => $e->getMessage()
                        ]);
                    }
                }

                DB::commit();

                $response = [
                    'success' => $savedCount > 0,
                    'message' => $savedCount > 0 
                        ? "Successfully saved {$savedCount} beacon reading(s)" 
                        : "No readings were saved",
                    'saved_count' => $savedCount,
                    'timestamp' => now()->toISOString()
                ];

                if (!empty($errors)) {
                    $response['errors'] = $errors;
                    $response['error_count'] = count($errors);
                }

                Log::info('Gateway data saved to database', [
                    'saved_count' => $savedCount,
                    'error_count' => count($errors)
                ]);

                return response()->json($response, 200);

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error('Error saving gateway data', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error saving data: ' . $e->getMessage()
            ], 500);
        }
    }
}