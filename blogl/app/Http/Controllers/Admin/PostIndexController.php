<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostIndexController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']); /*через авторизацию*/
    }
    /*todo: Функция для постов которые будут находиться в admin/posts в vue*/
    public function __invoke()
    {
        return PostResource::collection(Post::latest()->get());
    }

}
