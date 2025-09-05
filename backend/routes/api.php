<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\UserLevelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ColorController;

// Javne rute
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Level rute
Route::get('/levels', [LevelController::class, 'index']);
Route::get('/levels/{id}', [LevelController::class, 'show']);
Route::get('/levels/order/{order}', [LevelController::class, 'getByOrder']);

// Zasticene korisnike
Route::middleware(['auth:sanctum'])->group(function () {

    // User rute
    Route::get('user', [UserController::class, 'show']);
    Route::put('user', [UserController::class, 'update']);
    Route::delete('user', [UserController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Zavrsavanje levela
    Route::post('/levels/{id}/complete', [LevelController::class, 'complete']);
    
    // UserLevel rute
    Route::get('/user-levels', [UserLevelController::class, 'showUserLevels']);
    Route::get('/user-levels/{id}', [UserLevelController::class, 'show']);
    Route::post('/user-levels', [UserLevelController::class, 'store']);
    Route::put('/user-levels/{id}', [UserLevelController::class, 'update']);
    Route::delete('/user-levels/{id}', [UserLevelController::class, 'destroy']);
    Route::get('/leaderboard/{levelId}', [UserLevelController::class, 'getLeaderboard']);
    Route::get('/user-levels-status', [UserLevelController::class, 'getUserLevelsWithStatus']);
    
    // Admin rute - samo za admine
    Route::middleware(['admin'])->group(function () {
        Route::post('/levels', [LevelController::class, 'store']);
        Route::put('/levels/{id}', [LevelController::class, 'update']);
        Route::delete('/levels/{id}', [LevelController::class, 'destroy']);
        Route::get('/admin/user-levels', [UserLevelController::class, 'index']);
        Route::post('/color-palette', [ColorController::class, 'generatePalette']);
        Route::delete('/admin/user/{id}', [UserController::class, 'destroyAccount']);
        Route::get('/admin/users', [UserController::class, 'index']);
    });
});