<?php

namespace App\Http\Controllers;

use App\Course;
use App\Section;

class SectionController extends Controller
{
 
    public function store(Course $course)
    {
        $this->validation();

        $section = Section::create([
            'name' => request('name'),
            'number' => request('number'),
            'course_id' => $course->id
        ]);

        // abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.  
        return response()->json(['sectionId' => $section->id]);  

    }

    public function update(Section $section)
    {
        $user = auth()->user();

        if ($section->Course->User == $user or $user->role == 'Admin' ) {
        
            $this->validation();
            
            $section->update(request(['name','number']));
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

    public function destroy(Section $section)
    {
        $user = auth()->user();

        if ($section->Course->User == $user or $user->role == 'Admin' ) {
            
            $section->delete();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

    protected function validation()
    {
        return request()->validate([
            'name' => 'required',
            'number' => 'required|integer',
        ]);
    }
}
