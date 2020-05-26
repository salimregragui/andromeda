<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //

    public function destroy (Comment $comment)
    {
        try {
            $user = auth()->userOrFail();
            if ($comment->Chapter->Section->Course->User == $user or $comment->User == $user or $user->role == 'Admin' ) {
                
                $comment->delete();
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

            }
            abort(401);
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        
    }
}
