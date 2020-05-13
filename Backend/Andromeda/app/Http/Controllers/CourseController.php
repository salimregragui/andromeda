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
        
        $this->displayCourses($courses);

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
        
        return ['course' => $course];
    }
    
    public function nouveau()
    {
        // display all courses order by latest 
        $courses=Course::latest()->get();

        $this->displayCourses($courses);
        
        return ['course' => $courses];
    }

    
    private function displayCourses($courses)
    {
        /*
         this methode display courses with section and 
         chapter and also with count chapters and followers

        */

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

        return $courses;
    }
}
