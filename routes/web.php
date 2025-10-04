<?php

use App\Http\Controllers\MinerController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::name('dashboard.')->controller(\App\Http\Controllers\DashBoardController::class)->middleware('auth')->group(function () {
    Route::get('/', 'dashboard')->name('index');
    Route::get('/analysis', 'analysis')->name('analysis');
});

// Mine Routes
Route::middleware('auth')->group(function () {
    // Tunnel Designer Routes
    Route::get('/tunnel-designer', [\App\Http\Controllers\TunnelController::class, 'index'])->name('tunnel.index');
    Route::get('/tunnel-designer/enhanced', [\App\Http\Controllers\TunnelController::class, 'enhanced'])->name('tunnel.enhanced');
});

// API Routes for Tunnel Designer and Miner Tracking
Route::middleware('auth')->prefix('api')->group(function () {
    // Tunnel Designer API Routes
    Route::post('/tunnel-data', [\App\Http\Controllers\TunnelController::class, 'store'])->name('api.tunnel.store');
    Route::get('/mines/{mine}/tunnel-data', [\App\Http\Controllers\TunnelController::class, 'getTunnelData'])->name('api.tunnel.data');

    // Mines API (lightweight JSON endpoints)
    Route::post('/mines', [\App\Http\Controllers\MineController::class, 'storeApi'])->name('api.mines.store');

    Route::delete('/mines/{mine}', [\App\Http\Controllers\MineController::class, 'destroy'])->name('api.mines.destroy');
    
    // Miners API
    Route::get('/miners', [MinerController::class, 'index'])->name('api.miners.index');
    Route::post('/miners', [MinerController::class, 'store'])->name('api.miners.store');
    Route::put('/miners/{miner}', [MinerController::class, 'update'])->name('api.miners.update');
    Route::delete('/miners/{miner}', [MinerController::class, 'destroy'])->name('api.miners.destroy');
    Route::patch('/miners/{miner}', [MinerController::class, 'update']);

    // Miner Position Tracking API Routes (for Raspberry Pi)
    Route::post('/miner-position', [\App\Http\Controllers\TunnelController::class, 'receiveMinerPosition'])->name('api.miner.position');
    Route::get('/mines/{mine}/miner-positions', [\App\Http\Controllers\TunnelController::class, 'getMinerPositions'])->name('api.miner.positions');

    Route::get('/beacons/latest', [\App\Http\Controllers\TunnelController::class, 'latestBeacons'])->name('api.beacons.latest');
});

Route::get('set-locale/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'tr'])) {
        session(['locale' => $locale]);
        Illuminate\Support\Facades\App::setLocale($locale);
    }else{
        session(['locale' => 'tr']);
        Illuminate\Support\Facades\App::setLocale('tr');
    }
    return redirect()->back();
});

Route::get('create-user', function () {
    User::create([
        'name' => 'Admin',
        'email' => 'admin@ermed.com',
        'password' => bcrypt('123456Em'),
    ]);

    return 'User created successfully';
});

Route::get('login-user', function () {
    Auth::login(User::find(1));

    return 'User logged in successfully';
});

Route::get('logout-user', function () {
    Auth::logout();

    return 'User logged out successfully';
});

Auth::routes();

Route::get('/logout', [\App\Http\Controllers\HomeController::class, 'logoutUser'])->name('logout')->middleware('auth');


Route::get('/login-admin', function () {
    Auth::loginUsingId(1);
    return redirect('/tunnel-designer');
})->name('login-admin');
