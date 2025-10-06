<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequestLogger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Request'i logla
        $this->logRequest($request);
        
        return $next($request);
    }
    
    /**
     * Request'i dosyaya logla
     */
    private function logRequest(Request $request): void
    {
        // İstenmeyen route'ları filtrele (asset dosyaları, favicon vb.)
        $excludePatterns = [
            '/favicon.ico',
            '/css/',
            '/js/',
            '/images/',
            '/fonts/',
            '/build/',
            '/theme-assets/',
            '/hot',
            '/_debugbar',
            '/api/request-logs',
            '/api/beacons/latest',
        ];
        
        $currentPath = $request->getPathInfo();
        foreach ($excludePatterns as $pattern) {
            if (str_contains($currentPath, $pattern)) {
                return;
            }
        }
        
        $logData = [
            'timestamp' => now()->format('Y-m-d H:i:s'),
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'path' => $request->getPathInfo(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'payload' => $this->getPayload($request),
            'headers' => $this->getImportantHeaders($request),
            'query_params' => $request->query(),
        ];
        
        // Log dosyasının yolu
        $logFile = storage_path('logs/http_requests.json');
        
        // Mevcut logları oku
        $existingLogs = [];
        if (file_exists($logFile)) {
            $content = file_get_contents($logFile);
            $existingLogs = json_decode($content, true) ?? [];
        }
        
        // Yeni log'u ekle (en son 1000 log'u tut)
        array_unshift($existingLogs, $logData);
        $existingLogs = array_slice($existingLogs, 0, 1000);
        
        // Dosyaya yaz
        file_put_contents($logFile, json_encode($existingLogs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
    
    /**
     * Request payload'ını al
     */
    private function getPayload(Request $request): array
    {
        $payload = [];
        
        // POST, PUT, PATCH verilerini al
        if (in_array($request->method(), ['POST', 'PUT', 'PATCH'])) {
            $payload['form_data'] = $request->all();
            
            // Raw body varsa al
            $rawBody = $request->getContent();
            if (!empty($rawBody) && $rawBody !== '[]' && $rawBody !== '{}') {
                $payload['raw_body'] = $rawBody;
                
                // JSON ise parse et
                $jsonData = json_decode($rawBody, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $payload['json_data'] = $jsonData;
                }
            }
        }
        
        return $payload;
    }
    
    /**
     * Önemli header'ları al
     */
    private function getImportantHeaders(Request $request): array
    {
        $importantHeaders = [
            'content-type',
            'authorization',
            'x-api-key',
            'x-requested-with',
            'accept',
            'origin',
            'referer'
        ];
        
        $headers = [];
        foreach ($importantHeaders as $header) {
            if ($request->hasHeader($header)) {
                $headers[$header] = $request->header($header);
            }
        }
        
        return $headers;
    }
}
