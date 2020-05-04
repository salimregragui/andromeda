<?php

namespace App\Http\Controllers;

use App\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    
    public function index()
    {
        // Display all  courses with all sections and chapters
        $courses=Course::all();
        
        foreach ($courses as $course) 
        {
            foreach ($course->Sections as $section) 
            {
                foreach ($section->Chapters as $chapter) 
                {
                }
            }
        }

        return ['courses' => $courses];
    }

    public function show($id)
    {
        // Display the specified course with all sections and chapters

        $course=Course::find($id);

        foreach ($course->Sections as $section) 
        {
            foreach ($section->Chapters as $chapter) 
            {
            }
        }
        
        return ['course' => $course];
    }
    
}
