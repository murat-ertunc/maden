<?php

use App\Http\Controllers\TunnelController;
use App\Http\Controllers\GatewayController;
use Illuminate\Support\Facades\Route;

// Beacon and Gateway endpoints (Public - No Auth)
Route::get('/beacons/latest', [TunnelController::class, 'latestBeacons'])->name('api.beacons.latest.v2');
Route::get('/beacons/last-reading/{beaconId}', [TunnelController::class, 'lastBeaconReading'])->name('api.beacons.last-reading');
Route::any('/gateway-data', [GatewayController::class, 'storeGatewayData'])->name('api.gateway-data');

// HTTP Request monitoring endpoints
Route::get('/request-logs', [GatewayController::class, 'getRequestLogs'])->name('api.request-logs');
Route::delete('/request-logs', [GatewayController::class, 'clearRequestLogs'])->name('api.request-logs.clear');
