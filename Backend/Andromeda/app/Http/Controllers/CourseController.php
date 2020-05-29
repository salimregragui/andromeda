<?php

namespace App\Http\Controllers;

use App\Course;
use App\Progression;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    
    public function index()
    {
        // Display all  courses with all sections and chapters order by popular 
        $courses=Course::all();
        
        foreach ($courses as $course) 
        {
            $cptChapter=0; //compteur de chapitre dans chaque cours

            $course['suivis']=$course->Followed()->count(); // nombre d'user qui suivent ce cours 
            
            foreach ($course->Sections as $section) 
            {
                foreach ($section->Chapters as $chapter) 
                {
                    $cptChapter++;
                    foreach ($chapter->Comments as $comment ) 
                    {
                        
                    }
                }
            }

            $course['numberOfChapter']=$cptChapter; // nombre de chapitre dans se cours 
        }

        return ['courses' => $courses->sortByDesc('suivis')->values()->all()]; // order by popular 
    }

    public function show(Course $course)
    {
        // Display the specified course with all sections and chapters

        $cptChapter=0; //compteur de chapitre dans chaque cours

        $course['suivis']=$course->Followed()->count(); // nombre d'user qui suivent ce cours 
        
        foreach ($course->Sections as $section) 
        {
            foreach ($section->Chapters as $chapter) 
            {
                $cptChapter++;
                
                foreach ($chapter->Comments as $comment ) 
                {
                    
                }
            }
        }

        $course['numberOfChapter']=$cptChapter; // nombre de chapitre dans se cours 
        
        return response()->json(['course' => $course]);
    }
    
    public function courseProgressions()
    {
        try {
            
            $user = auth()->userOrFail();

            if ($user->Followed->isNotEmpty())
            {
                $data =[] ;
                foreach ($user->followed as $course) 
                {
                    $cptChapter=0; //compteur de chapitre dans chaque cours
    
                    $course['suivis']=$course->Followed()->count(); // nombre d'user qui suivent ce cours 
                  
                    $course['progression']=$user->progression($course);//la progression 
    
                    foreach ($course->Sections as $section) 
                    {
                        foreach ($section->Chapters as $chapter) 
                        {
                            $cptChapter++;
                        }
                    }
        
                    $course['numberOfChapter']=$cptChapter; // nombre de chapitre dans se cours 
                    array_push($data,$course);
                }
    
                return response()->json(['Courses' => $data]);
                
            }

            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

    public function follow_unfollow(Course $course)
    {
        try {
            
            $user = auth()->userOrFail();
            
            if ($user->followed->where('pivot.course_id',$course->id)->isEmpty()) {
                
                $progressionNew= new Progression();
                $progressionNew->user_id=$user->id;
                $progressionNew->course_id=$course->id;
                $progressionNew->chapter_id=$course->Sections[0]->Chapters[0]->id;//* il sont par ordre asc see model
                $progressionNew->save();

                $user->Followed()->attach($course);

                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.


            }
            else {

                $user->Followed()->detach($course);
                $user->progression($course)->delete();
                
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.

            }

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {

            abort(401);

        }
    }

    public function store()
    {
        $this->validation();

        $course = new Course(['name','description','rating']);
        $course->user_id = auth()->user();
        $course->save();

        abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

    }

    public function update(Course $course)
    {   
        $user = auth()->user();

        if ($course->User == $user or $user->role == 'Admin' ) {
        
            $this->validation();
            
            $course->update(request(['name','description','rating']));
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);

    }

    protected function validation()
    {
        return request()->validate([
            'name' => 'required',
            'description' => 'required',
            'rating' => 'nullable|numeric|min:1|max:5',
        ]);
    }
    
    public function destroy (Course $course)
    {


        $user = auth()->user();

        if ($course->User == $user or $user->role == 'Admin' ) {
            
            $course->delete();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);

    }
}
