<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Rute za level - samo za admine
    Route::middleware(['admin'])->group(function () {
        Route::post('/levels', [LevelController::class, 'store']);
        Route::put('/levels/{id}', [LevelController::class, 'update']);
        Route::delete('/levels/{id}', [LevelController::class, 'destroy']);
    });
    
});

Route::get('/levels', [LevelController::class, 'index']);
    
Route::get('/levels/{id}', [LevelController::class, 'show']);