<?php

namespace App\Http\Controllers;

use App\Question;
use App\Quiz;

class QuestionController extends Controller
{
    public function store(Quiz $quiz)
    {
 
        $user = auth()->user();

        if ($quiz->Section->Course->User == $user or $user->role == 'Admin' ) {
            
            $this->validation();

            $question= Question::create([
                'quiz_id' => $quiz->id,
                'question' => request('question'),
                'response_1' => request('response_1'),
                'response_2' => request('response_2'),
                'response_3' => request('response_3'),
                'response_correct' => request('response_correct'),
            ]);
            
            return response()->json(['Question' => $question]);
    

        }

        abort(401);
    }

   
    public function update(Question $question)
    {
       
        $user = auth()->user();

        if ($question->Quiz->Section->Course->User == $user or $user->role == 'Admin' ) {
            
            $this->validation();
        
            $question->question = request('question');
            $question->response_1 = request('response_1');
            $question->response_2 = request('response_2');
            $question->response_3 = request('response_3');
            $question->response_correct = request('response_correct');
            $question->save();
            
            return response()->json(['Question' => $question]);
            
        }

        abort(401);
    }

    public function destroy(Question $question)
    {
        $user = auth()->user();

        if ($question->Quiz->Section->Course->User == $user or $user->role == 'Admin' ) {
            
            $question->delete();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

    protected function validation()
    {
        return request()->validate([
            'question' => 'required|string',
            'response_1' => 'required|string',
            'response_2' => 'required|string',
            'response_3' => 'required|string',
            'response_correct' => 'required|string',

        ]);
    }
}
