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
            $discussion = request(['discussion_id']);
            $discussion_id= $discussion['discussion_id'];
            if ($discussion_id == null) {
                //TODO create discution 
                $new_discussion= Discussion::create([
                    'type' => $type,
                ]);
                $new_discussion->save();

               $discussion_id = $new_discussion->id;

               //* attach this user whith the discusion
               $user2= User::find(request(['user_id']))->first();
               $user2->discussions()->attach($discussion_id);
               $user->discussions()->attach($discussion_id);
            }
            //todo create message and attach the message whit discussion 
            $attachment = null;
            
            if (request()->hasFile('attachment')) {
                $attachment=Str::random(5).''.time().'.'.Str::random(3).'.'.request()->attachment->getClientOriginalExtension();
                request()->attachment->move(public_path('storage/messages/'),$attachment);
            }

            $message= Message::create([
                'discussion_id'=> $discussion_id,
                'user_id' => $user->id,
                'text' => request('text'),
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
            "text" => 'required_if:attachment,null|max:2048',
            "attachment" => 'required_if:text,null|image|mimes:jpeg,png,jpg,svg,gif|max:2048', //? should the message attachment be only an image ?
            "user_id" => 'required_if:discussion_id,null',// id de celui a qui on envoi le message
            "discussion_id" => 'required_if:user_id,null',
        ]);
    }

    public function destroy(Message $message)
    {
        try {
            $user = auth()->userOrFail();
            if ($message->user_id == $user->id) {
                if ($message->attachment != null) {
                        
                    $file_path='storage/messages/'.$message->attachment;

                    if (file_exists($file_path)) 
                    {
                        unlink($file_path);
                    }
                }
                $message->delete();
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    
            
            }
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        abort(401);
        
    }
}
