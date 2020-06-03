<?php

namespace App\Http\Controllers;

use App\Course;
use App\Quiz;
use App\Section;

class QuizController extends Controller
{
  
    public function index(Course $course)
    {
        try {
            $user = auth()->userOrFail();
            $all_data = [];
            
            foreach ($course->Sections as $section) {

                $result=$section->quiz->Result($user);
                $question=$section->quiz->questions;
                $data=['Result' => $result , 'Questions' => $question];
                array_push($all_data,$data);

            }

            return response()->json(['quizzes' => $all_data]);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
        abort(401);
        
    }

    public function store(Section $section)
    {
        $user = auth()->user();

        if ($section->Course->User == $user or $user->role == 'Admin' ) {
           
            $quiz = Quiz::create([
                'section_id' => $section,
                   
                ]);
        
                return response()->json(['quiz_id' => $quiz->id]);          

        }

        abort(401);
    }

    public function show(Section $section)
    {
        
        try {
            $user = auth()->userOrFail();
            $data =  ["Result" => $section->quiz->Result($user)];
            $data['Questions'] = $section->quiz->questions;
           
            return response()->json(['quiz' => $data]);
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
           abort(401);
        }
        abort(401);
        
    }

    public function destroy(Quiz $quiz)
    {
        
        $user = auth()->user();

        if ($quiz->Section->Course->User == $user or $user->role == 'Admin' ) {
            
            $quiz->delete();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

}
