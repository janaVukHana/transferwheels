<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function(Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/contact-us', [ContactController::class, 'index']);
    Route::delete('/contact-us/{message}', [ContactController::class, 'destroy']);
});

// unprotected api routes - you don't need to be logged
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contact-us', [ContactController::class, 'store'])->name('contact.us.store');
