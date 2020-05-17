<?php

namespace App\Http\Controllers;

use App\Course;
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
                }
            }

            $course['numberOfChapter']=$cptChapter; // nombre de chapitre dans se cours 
        }

        return ['courses' => $courses->sortByDesc('suivis')->values()->all()]; // order by popular 
    }

    public function show($id)
    {
        // Display the specified course with all sections and chapters

        $course=Course::find($id);

        $cptChapter=0; //compteur de chapitre dans chaque cours

        $course['suivis']=$course->Followed()->count(); // nombre d'user qui suivent ce cours 
        
        foreach ($course->Sections as $section) 
        {
            foreach ($section->Chapters as $chapter) 
            {
                $cptChapter++;
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
                }
    
                return response()->json(['course' => $course]);
                
            }

            return "aucun cours suivi";

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            // do something
            return "error :(";
        }
    }
}
