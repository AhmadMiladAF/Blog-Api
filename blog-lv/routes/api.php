<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostIndexController;
use App\Http\Controllers\PostShowController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/posts', PostIndexController::class);
Route::get('/posts/{post:slug}', PostShowController::class); //{post} означает, что этот параметр будет соответствовать записи модели Post
