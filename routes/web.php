<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::name('dashboard.')->controller(\App\Http\Controllers\DashBoardController::class)->middleware('auth')->group(function () {
    Route::get('/', 'dashboard')->name('index');
    Route::get('/analysis', 'analysis')->name('analysis');
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
