<?php

use App\Http\Controllers\TunnelController;
use App\Http\Controllers\GatewayController;
use Illuminate\Support\Facades\Route;

Route::get('/beacons/latest', [TunnelController::class, 'latestBeacons'])->name('api.beacons.latest');

// Gateway data endpoint - accepts all HTTP methods
Route::any('/gateway-data', [GatewayController::class, 'storeGatewayData'])->name('api.gateway-data');

// HTTP Request monitoring endpoints
Route::get('/request-logs', [GatewayController::class, 'getRequestLogs'])->name('api.request-logs');
Route::delete('/request-logs', [GatewayController::class, 'clearRequestLogs'])->name('api.request-logs.clear');
