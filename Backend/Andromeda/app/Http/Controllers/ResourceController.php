<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Course;
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
    
                foreach ($course->Resources as $resource) {

                    $resource->attachment=asset('storage/resources'.$resource->attachment);
                }
    
                array_push($alldata,$data);

            }
            return response()->json(['CoursesResources' => $alldata]);


        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

 
    public function store(Course $course)
    {
        $this->validation();
        $extention=request()->attachment->getClientOriginalExtension();

        $resource = Resource::Create([
            'name'=> request('name'),
            'course_id' => $course->id,
            'attachment' => Str::random(5).''.time().'.'.Str::random(3).''.$extention,
            'type' => request()->attachment->getClientMimeType() ,
        ]);

        request()->attachment->move(public_path('storage/resources'),$resource->attachment);
        abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

    }

    public function show(Resource $resource)
    {
        try {
            $user = auth()->userOrFail();
            
           $resource->attachment=asset('storage/resources'.$resource->attachment);
            return response()->json(['Resource' => $resource]);


        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

    public function update(Resource $resource)
    {
        $this->validation();
        $extention=request()->attachment->getClientOriginalExtension();
        $file_path=$resource->attachment;
        unlink($file_path);

        $resource->name= request('name');
        $resource->attachment= 'storage/resources'.Str::random(5).''.time().'.'.Str::random(3).''.$extention;
        $resource->type= request()->attachment->getClientMimeType();
        $resource->save();

        request()->attachment->move(public_path('storage/resources'),$resource->attachment);
        abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function destroy(Resource $resource)
    {
        $user = auth()->user();

        if ($resource->Course->User == $user or $user->role == 'Admin' ) {

            $file_path='storage/resources'.$resource->attachment;
            if (file_exists($file_path)) {
                $resource->delete();
                unlink($file_path);
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    
            }
            abort(403);
        }

        abort(401);
    }

    protected function validation()
    {
        return request()->validate([
            'name' => 'required',
            'attachment' => 'required|min:1| max:20000',
        ]);
    }
}
