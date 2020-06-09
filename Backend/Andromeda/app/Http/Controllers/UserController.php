<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    
    public function index()
    {
        // show all user 
        $users= User::all();

        foreach ($users as $user) {
            if ($user->image != null) {
                $user->image= asset(Storage::url('images/'.$user->image));
            }
            
        }
        return response()->json(['Users' => $users]);
    }

    public function show($name)
    {
        // Display the specified user
        $user =User::where('name',$name)->firstOrFail();
        if ($user->image != null) {
            $user->image= asset(Storage::url('images/'.$user->image));
        }
        $user->Progressions;
        return response()->json(['User' => $user]);
    }

    public function update(User $user)
    {
        //update the specified user
        $request=$this->validator($user);

        $user->update([
            'name' => $request['name'],
            'role' => $request['role'],
            'status' => $request['status'],
            'password' => Hash::make($request['password']),
        ]);
        
    }

    public function destroy(User $user)
    {
        //Remove the specified user
        $user->delete();

    }

    private function validator(User $user)
    {
        return request()->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => 'required|string|max:255|email|unique:users,email,'.$user->id ,
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required','in:Admin,Membre'],
            'status' =>  ['required','in:Active,Banned,Refused'],
        ]);
        
    }

    public function banned(User $user)
    {
        if ($user->role != 'Admin') {
            $user->status ='Banned';
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    
        }
        else {
            abort(401);
        }
        
    }

    public function profile_photo(User $user)
    {
        try {
            $user = auth()->userOrFail();
            $this->validate_image();
            $file_path='storage/images/'.$user->image;
           
            if (file_exists($file_path) and $user->image != null) {
                unlink($file_path);    
            }
            $user->image=Str::random(5).''.time().'.'.Str::random(3).'.'.request()->image->getClientOriginalExtension();
            request()->image->move(public_path('storage/images/'),$user->image);
            $user->save();
            return  asset(Storage::url('images/'.$user->image));

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        abort(401);
        
    }

    protected function validate_image()
    {
        return request()->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,svg,gif|max:2048',
        ]);
    }

}
