<?php

use App\Http\Controllers\Admin\PostIndexController as AdminPostIndexController;
use App\Http\Controllers\Admin\PostStoreController as AdminPostStoreController;
use App\Http\Controllers\Admin\PostEditController as AdminPostEditController;
use App\Http\Controllers\Admin\PostPatchController as AdminPostPatchController;
use App\Http\Controllers\Admin\PostDestroyController as AdminPostDestroyController;
use App\Http\Controllers\PostIndexController;
use App\Http\Controllers\PostShowController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', PostIndexController::class);
Route::get('/posts/{post:slug}', PostShowController::class); //{post} означает, что этот параметр будет соответствовать записи модели Post
Route::get('/admin/posts', AdminPostIndexController::class);

Route::post('/admin/posts', AdminPostStoreController::class);
Route::get('/admin/posts/{post:uuid}/edit', AdminPostEditController::class);

Route::patch('/admin/posts/{post:uuid}', AdminPostPatchController::class);
Route::delete('/admin/posts/{post:uuid}', AdminPostDestroyController::class);
