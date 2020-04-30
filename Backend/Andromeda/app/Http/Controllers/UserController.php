<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    
    public function index()
    {
        // show all user 
        return User::all();
    }

    public function show($id)
    {
        // Display the specified user
        return User::find($id);
    }

    public function update(User $user)
    {
        //update the specified user
        $request=$this->validator($user);

        $user->update([
            'name' => $request['name'],
            'email' => $request['email'],
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
}
