<?php

namespace App\Http\Controllers;

use App\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class NotificationController extends Controller
{
    //
    public function index()
    {
        try {
            
            $user = auth()->userOrFail();
            return response()->json($user->Notifications);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            // do something
            return "error :(";
        }
        
    }

    public function show(Notification $notification)
    {

        try { //* check il user are authentificate 
            $user = auth()->userOrFail();

            return response()->json($user->Notifications->where('id',$notification->id));

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            // do something
            return "error :(";
        }
    }

    public function delete(Notification $notification)
    {
        //* check if this notification belongs to the currently authenticated user
        if ($notification->User == auth()->user() ) { 
        
            $notification->delete();
            return 1;
        }

        return 0;
    }

}
