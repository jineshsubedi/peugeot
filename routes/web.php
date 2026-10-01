<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;

Route::get('/', [FrontendController::class, 'index'])->name('home');

Route::post('/api/test-ride', [FrontendController::class, 'storeTestRide']);
Route::post('/api/dealer-application', [FrontendController::class, 'storeDealerApplication']);

Route::get('/admin/login', [AdminAuthController::class, 'showLogin'])->name('login');
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    
    // Ride & Product Booking Actions
    Route::post('/admin/test-rides', [AdminDashboardController::class, 'storeTestRide']);
    Route::post('/admin/test-rides/{id}/status', [AdminDashboardController::class, 'updateTestRideStatus']);
    Route::delete('/admin/test-rides/{id}', [AdminDashboardController::class, 'destroyTestRide']);
    
    // Dealer Apps Actions
    Route::post('/admin/dealer-apps/{id}/status', [AdminDashboardController::class, 'updateDealerAppStatus']);
    Route::delete('/admin/dealer-apps/{id}', [AdminDashboardController::class, 'destroyDealerApp']);

    // Products Management Actions
    Route::post('/admin/products', [AdminDashboardController::class, 'storeProduct']);
    Route::post('/admin/products/{id}', [AdminDashboardController::class, 'updateProduct']);
    Route::delete('/admin/products/{id}', [AdminDashboardController::class, 'destroyProduct']);
});
