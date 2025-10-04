<?php

use App\Http\Controllers\TunnelController;
use Illuminate\Support\Facades\Route;

Route::get('/beacons/latest', [TunnelController::class, 'latestBeacons'])->name('api.beacons.latest');
