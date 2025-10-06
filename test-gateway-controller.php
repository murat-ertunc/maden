<?php
// Simple test to verify our gateway controller works
require_once 'vendor/autoload.php';

use Illuminate\Http\Request;
use App\Http\Controllers\GatewayController;

// Create a mock request
$request = Request::create('/api/gateway-data', 'POST', [
    'test_data' => 'sample_value',
    'device_id' => 'test_device_123',
    'temperature' => 25.5,
    'humidity' => 60
]);

// Create controller instance
$controller = new GatewayController();

// Test the method
try {
    $response = $controller->storeGatewayData($request);
    echo "Response Status: " . $response->getStatusCode() . "\n";
    echo "Response Content: " . $response->getContent() . "\n";
    
    // Check if file was created
    if (file_exists('public/gateway-data.json')) {
        echo "\nFile created successfully!\n";
        echo "File contents:\n";
        echo file_get_contents('public/gateway-data.json');
    } else {
        echo "\nFile was not created.\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>