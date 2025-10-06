<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

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
     * Store incoming gateway data to JSON file
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storeGatewayData(Request $request): JsonResponse
    {
        // Add debug log to see if route is being hit
        Log::info('Gateway endpoint called', ['method' => $request->method(), 'data' => $request->all()]);
        
        try {
            // Get all request data
            $requestData = [
                'timestamp' => now()->toISOString(),
                'method' => $request->method(),
                'headers' => $request->headers->all(),
                'query_parameters' => $request->query(),
                'body' => $request->all(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent()
            ];

            // Define file path in public directory
            $filePath = public_path('gateway-data.json');

            // Read existing data if file exists
            $existingData = [];
            if (file_exists($filePath)) {
                $existingContent = file_get_contents($filePath);
                $existingData = json_decode($existingContent, true) ?? [];
            }

            // Add new data to existing data array
            $existingData[] = $requestData;

            // Save updated data to JSON file
            $jsonData = json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            file_put_contents($filePath, $jsonData);

            // Log the activity
            Log::info('Gateway data saved', [
                'file' => $filePath,
                'data_count' => count($existingData)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data successfully saved to gateway-data.json',
                'timestamp' => $requestData['timestamp']
            ], 200);

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