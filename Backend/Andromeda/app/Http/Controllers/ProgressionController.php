<?php

namespace App\Http\Controllers;

use App\Course;


class ProgressionController extends Controller
{
    public function store(Course $course)
    {
        try {
            $authUser = auth()->userOrFail();

            if ($course->valide != 0 and $authUser->Followed->where('id',$course->id)->isNotEmpty()) {
                $this->validation();
                $progression=$authUser->Progressions->where('course_id',$course->id)->first();
                
                $progression->note=request('note');

                if (request('text') != null) {
                    $progression->text=request('text');
                }
                $progression->save();
                
                $note=0;
                $cpt=0;

                foreach ($course->Followed as $user) {
                    
                    if ($user->Progressions->where('course_id',$course->id)->first()->note != null) {
                    
                        $note = $note + $user->Progressions->where('course_id',$course->id)->first()->note;
                        $cpt++;
                    }
                  
                    if ($user->image != null) {
                        $user->image=asset(Storage::url('images/'.$user->image));
                    }
                }

                if ($cpt != 0) {
                
                    $course->rating=$note/$cpt;
                    $course->save();
                    
                    return response()->json(['course_rating' => $course->rating ,'user' => $authUser]);
                }
                else
                {
                    abort(500);
                }
            }
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        abort(401);
        
    }
   
    protected function validation()
    {
        return request()->validate([
            "text" => 'string|max:2048',
            "note" => 'required|in:1,2,3,4,5',
        ]);
    }

   
}
