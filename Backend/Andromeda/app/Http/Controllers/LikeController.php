<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Like;
use App\Response;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    //
    public function like_unlike_comment(Comment $comment)
    {
        try {
            $user = auth()->userOrFail();

            if ($comment->Likes->where('user_id',$user->id)->isEmpty()) {
                $like= new Like();
                $like->comment_id=$comment->id;
                $like->user_id=$user->id;
                $like->save();
                return $like;
            }
            else {
                $like=Like::where([['user_id',$user->id],['comment_id',$comment->id]])->firstOrFail();
                $like->delete();

            }
           
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
           abort(401);
        }
        
    }
    public function like_unlike_response(Response $response)
    {
        try {
            $user = auth()->userOrFail();

            if ($response->Likes->where('user_id',$user->id)->isEmpty()) {
                $like= new Like();
                $like->response_id=$response->id;
                $like->user_id=$user->id;
                $like->save();
                return $like;
            }
            else {
                $like=Like::where([['user_id',$user->id],['response_id',$response->id]])->firstOrFail();
                $like->delete();

            }
           
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
           abort(401);
        }
        
    }
}
