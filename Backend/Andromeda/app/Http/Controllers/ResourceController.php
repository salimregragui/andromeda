<?php

namespace App\Http\Controllers;

use App\Resource;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $user = auth()->userOrFail();
            $alldata =[] ;
            
            foreach ($user->Followed as $course) {
                
              
                $data['id']=$course->id;
                $data['name']=$course->name;
                $data['description']=$course->description;
                $data['user_id']=$course->user_id;
                $data['rating']=$course->rating;
                $data['created_at']=$course->created_at;
                $data['updated_at']=$course->updated_at;
                $data['Resources']=$course->Resources;
                
                array_push($alldata,$data);

            }
            return response()->json(['CoursesResources' => $alldata]);


        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

 
    public function store(Request $request)
    {
        //
    }

    public function show(Resource $resource)
    {
        try {
            $user = auth()->userOrFail();
            
           
            return response()->json(['Resource' => $resource]);


        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

    public function update(Request $request, Resource $resource)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function destroy(Resource $resource)
    {
        //
    }
}
