<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        try {
            $user = auth()->userOrFail();

            return response()->json(['tasks' => $user->Tasks]);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        //
        try {
            $user = auth()->userOrFail();

                
                $this->validation();
                $task=new Task(request(['content','type','status']));
                $task->user_id=$user->id;
                $task->save();

                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    


        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            
            abort(401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        try {
            $user = auth()->userOrFail();

            if ($user->Tasks->where('id',$task->id)->first() != null) {
                
                return response()->json(['task' => $task]);

            }

            abort(401);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            
            abort(401);
        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Task $task)
    {
        //
        try {
            $user = auth()->userOrFail();

            if ($user->Tasks->where('id',$task->id)->first() != null) {
                
                $this->validation();
                $task->update(request(['content','type','status']));

                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    
            }

            abort(401);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            
            abort(401);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        try {
            $user = auth()->userOrFail();

            if ($user->Tasks->where('id',$task->id)->first() != null) {

                $task->delete();
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
            "content" => 'required|string',
            "type" => 'required|in:Important,Moyen,Basique',
            "status" => 'required|in:Fini,en cours,a faire',
            
        ]);
    }
}
