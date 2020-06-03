<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Chapter;
use App\Http\Controllers\NotificationController;
class CommentController extends Controller
{
    //

    public function store(Chapter $chapter)
    {
        
        try {
            $user = auth()->userOrFail();
        
            if ($user->followed->where('pivot.course_id',$chapter->Section->Course->id)->isNotEmpty()){
                $this->validation();
                $comment= Comment::create([
                    'chapter_id' => $chapter->id,
                    'content' => request('content'),
                    'user_id' => $user->id,
                ]);
                
            $notification=new NotificationController;

            $content=['text' => 'Un nouveau commentaire a ete ajouter au cours'.' '.$chapter->Section->Course->name ,'chapter_id' => $chapter->id, 'course_id' => $chapter->Section->Course->id ];
            $type='Nouveau commentaire ';
            $notification->sendNotification($chapter->Section->Course->User,json_encode($content),$type);
        
            return response()->json(['Comment' => $comment]);
        
        }
        abort(401);
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

    public function update(Comment $comment)
    {
        try {
            $user = auth()->userOrFail();

            if ($comment->User == $user){

                $this->validation();
                $comment->content = request('content');                
                return response()->json(['Comment' => $comment]);

            }

            abort(401);
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

    public function destroy (Comment $comment)
    {
        try {
            $user = auth()->userOrFail();
            if ($comment->Chapter->Section->Course->User == $user or $comment->User == $user or $user->role == 'Admin'or  $user->role == 'Professor') {
                
                $comment->delete();
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

            }
            abort(401);
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        
    }

    protected function validation()
    {
        return request()->validate([
            'content' => 'required|string|max:1000',
        ]);
    }
}
