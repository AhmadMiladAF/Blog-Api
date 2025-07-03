<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostShowController extends Controller
{
    public function __invoke(Post $post): PostResource
    {

        $this->authorize('show', $post); // Проверка авторизации где мы добавили в PostPolicy метод show
        //Авторизация

        return new PostResource($post);
    }
}
