<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Response;
use App\Http\Controllers\NotificationController;

class ResponseController extends Controller
{
    //
    public function store(Comment $comment)
    {
        try {
            $user = auth()->userOrFail();
        
            if ($user->followed->where('pivot.course_id',$comment->Chapter->Section->Course->id)->isNotEmpty()){
                $this->validation();
                $response= Response::create([
                    'comment_id' => $comment->id,
                    'content' => request('content'),
                    'user_id' => $user->id,
                ]);
            if ($user != $comment->User) {
                    
                $notification=new NotificationController;

                $content=[
                    'text' => $response->User->name.' a repondus a votre commentaire',
                    'chapter_id' => $comment->Chapter->id,
                    'course_name' => $comment->Chapter->Section->Course->name,
                    'comment_id' => $comment->id,
                    'response_id' => $response->id,
                    'user_name' => $response->User->name,
                ];
                
                $type='Nouvelle reponse';
                $notification->sendNotification($comment->User,json_encode($content),$type);
            
            }

            return response()->json(['chapter_id' => $comment->Chapter->id]);
        
        }
        abort(401);
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

    public function destroy (Response $response)
    {
        try {
            $user = auth()->userOrFail();
            if ($response->Comment->Chapter->Section->Course->User == $user or $response->User == $user or $user->role == 'Admin') {
                
                $response->delete();
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
            'content' => 'required|string|min:1|max:1000',
        ]);
    }

   
}
