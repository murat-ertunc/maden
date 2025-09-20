<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::name('dashboard.')->controller(\App\Http\Controllers\DashBoardController::class)->middleware('auth')->group(function () {
    Route::get('/', 'dashboard')->name('index');
    Route::get('/analysis', 'analysis')->name('analysis');
});

// Mine Routes
Route::middleware('auth')->group(function () {
    Route::resource('mines', \App\Http\Controllers\MineController::class);
});

// API Routes for 3D functionality
Route::middleware('auth')->prefix('api')->group(function () {
    // Mine Path Routes
    Route::apiResource('mines.paths', \App\Http\Controllers\Api\MinePathController::class);
    Route::get('/mines/{mine}/scene-data', [\App\Http\Controllers\Api\MinePathController::class, 'getSceneData'])->name('api.mines.scene-data');
    
    // Other mine routes
    Route::post('/mines/{mine}/models', [\App\Http\Controllers\Api\MineApiController::class, 'addModel'])->name('api.mines.models.store');
    Route::put('/mines/{mine}/models/{model}', [\App\Http\Controllers\Api\MineApiController::class, 'updateModel'])->name('api.mines.models.update');
    Route::delete('/mines/{mine}/models/{model}', [\App\Http\Controllers\Api\MineApiController::class, 'deleteModel'])->name('api.mines.models.destroy');
    Route::post('/mines/{mine}/layers', [\App\Http\Controllers\Api\MineApiController::class, 'addLayer'])->name('api.mines.layers.store');
    Route::put('/mines/{mine}/layers/{layer}', [\App\Http\Controllers\Api\MineApiController::class, 'updateLayer'])->name('api.mines.layers.update');
    Route::delete('/mines/{mine}/layers/{layer}', [\App\Http\Controllers\Api\MineApiController::class, 'deleteLayer'])->name('api.mines.layers.destroy');
    Route::put('/mines/{mine}/configuration', [\App\Http\Controllers\Api\MineApiController::class, 'updateConfiguration'])->name('api.mines.configuration.update');
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
    return redirect('/mines');
})->name('login-admin');
