<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Chapter;
use App\Course;
use App\Http\Controllers\NotificationController;
class CommentController extends Controller
{
    public function index(Course $course)
    {
        
        $data = array();
        foreach ($course->Sections as $section) {
            foreach ($section->Chapters as $chapter) {
                foreach ($chapter->Comments as $comment) {  
                    $comment->User;                 
                    foreach ($comment->Likes as $like) {
                        $like->User;
                        
                    }
                    foreach ($comment->Responses as $response) {
                        $response->User;
                        foreach ($response->Likes as $like) {
                            $like->User;
                        }
                    }
                    array_push($data,$comment);
                    
                }
            }
        }
        return $data;
    }

    public function show(Chapter $chapter)
    {
        $data = array();
        foreach ($chapter->Comments as $comment) {

            $comment->User;                 
            foreach ($comment->Likes as $like) {
                $like->User;
                
            }
            foreach ($comment->Responses as $response) {
                $response->User;
                foreach ($response->Likes as $like) {
                    $like->User;
                }
            }
            array_push($data,$comment);

        }
        return response()->json(['comments' => $data]);
    }

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
            if ($user != $chapter->Section->Course->User) {
                    
            $notification=new NotificationController;

            $content=['text' => 'Un nouveau commentaire a ete ajouter au cours'.' '.$chapter->Section->Course->name ,'chapter_id' => $chapter->id, 'course_id' => $chapter->Section->Course->id ];
            $type='Nouveau commentaire ';
            $notification->sendNotification($chapter->Section->Course->User,json_encode($content),$type);
        
            }

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
                $comment->save();              
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
            if ($comment->Chapter->Section->Course->User == $user or $comment->User == $user or $user->role == 'Admin') {
                
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
            'content' => 'required|string|min:1|max:1000',
        ]);
    }
}
