<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    //
    public function send()
    {
        try {
            $user = auth()->userOrFail();
        
            $this->validation();
            
            if (request(['discussion_id']) == null) {
                //TODO create discution 
            }
            //todo create message and attach the message whit discussion 
        
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        
    }
    
    protected function validation()
    {
        return request()->validate([
            "text" => 'required_if:attachment,null',
            "attachment" => 'required_if:text,null',
            "user_id" => 'required_if:discussion_id,null',
            "discussion_id" => 'required_if:user_id,null',
        ]);
    }
}
