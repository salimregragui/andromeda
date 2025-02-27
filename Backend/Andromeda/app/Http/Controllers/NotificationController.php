<?php

namespace App\Http\Controllers;

use App\Notification;
use App\User;

class NotificationController extends Controller
{
    //
   

    public function sendNotification(User $user , $content,$type)
    {
        $notification= Notification::create([
            'user_id' => $user->id,
            'content' => $content,
            'type' => $type,
            'seen' => 0,
        ]);
        
        return response()->json(['Notification' => $notification]);
    }

    public function index()
    {
        try {
            
            $user = auth()->userOrFail();
            return response()->json(['Notifications' => $user->Notifications]);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
           
            abort(401);
            
        }
        
    }

    public function show(Notification $notification)
    {

        try { //* check il user are authentificate 
            $user = auth()->userOrFail();

            return response()->json(['Notification' => $user->Notifications->where('id',$notification->id)]);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {

            abort(401);

        }
    }

    public function destroy(Notification $notification)
    {
        //* check if this notification belongs to the currently authenticated user
        if ($notification->User == auth()->user() ) { 
        
            $notification->delete();
           
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.
            
        }

        abort(401);
    }

    public function seen(Notification $notification)
    {
       
        try {
            $user = auth()->userOrFail();
            if ($notification->User == auth()->user() ) { 
        
                $notification->seen=1;
                 $notification->save();   
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.
                
            }

            abort(401);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        abort(401);
        
    }

}
