<?php

namespace App\Http\Controllers;

use App\Discussion;
use App\Message;
use App\User;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    //
    public function send($type)
    {
        try {
            $user = auth()->userOrFail();
        
            $this->validation();
            $discussion_id=request(['discussion_id']);
            if ($discussion_id == null) {
                //TODO create discution 
               if ($type =='groupe') {
                    $new_discussion= Discussion::create([
                        'type' => $type,
                    ]);
               }
               else {
                    $new_discussion= Discussion::create([
                        'type' => 'prive',
                    ]);
               }

               $discussion_id=$new_discussion->id;
               //* attach this user whith the discusion
               $user2= User::find(request(['user_id']))->firstOrFail();
               $user2->Discussions->attach($new_discussion->id);
               $user->Discussions->attach($new_discussion->id);
            }
            //todo create message and attach the message whit discussion 
            if (request()->hasFile('attachment')) {
                $attachment=Str::random(5).''.time().'.'.Str::random(3).''.request()->attachment->getClientOriginalExtension();
            }
            else {
                $attachment=null;
            }
            $message= Message::create([
                'discussion_id'=> $discussion_id,
                'user_id' => $user,
                'text' => request()->text,
                'attachment' => $attachment ,
            ]);
            return response()->json(['Message' => $message]);
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        
    }
    
    protected function validation()
    {
        return request()->validate([
            "text" => 'required_if:attachment,null',
            "attachment" => 'required_if:text,null|max:20000',
            "user_id" => 'required_if:discussion_id,null',// id de celui a qui on envoi le message
            "discussion_id" => 'required_if:user_id,null',
        ]);
    }

    public function destroy(Message $message)
    {
        try {
            $user = auth()->userOrFail();
            if ($message->user_id == $user->id) {
                $message->delete();
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    
            
            }
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        abort(401);
        
    }
}
