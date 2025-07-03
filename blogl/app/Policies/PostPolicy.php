<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
   public function show(?User $user, Post $post)
   {
        return $post->published === true;
   }
   public function before(?User $user)
   {
       if($user)
       {
              return true; // Если пользователь авторизован, разрешаем все действия
       }

       return null; // Если пользователь не авторизован, то он не увидит ничего
   }
}
