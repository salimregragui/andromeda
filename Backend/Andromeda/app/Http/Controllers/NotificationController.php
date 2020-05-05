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
    public function index(User $user)
    {
        return [ 'notifications' => $user->Notifications];
    }

    public function show()
    {
        // display user notifications
        // return [ 'notification' => Notification::find($notification)];
        // return [ 'notification' => auth()->user()->Notifications];
        // return dd(auth()->user());
        // JWTAuth::setToken("t6SdegimC3cXT3syfikuFxanMGUlhRQiru4Ip71HpE8BeRfBG0i674zNShqdbsSa");
        // JWTAuth::toUser(JWTAuth::getToken());
        // return JWTAuth::toUser();
        // return dd(JWTAuth::user());
        $user = JWTAuth::user();

        return response()->json($user->Notifications);
    }

}
