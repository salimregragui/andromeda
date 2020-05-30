<?php

namespace App\Http\Controllers;

use App\Section;
use App\Summary;

class SummaryController extends Controller
{
  
    public function store(Section $section)
    {
        $this->validation();

        $summary = new Summary(['content']);
        $summary->section_id = $section->id;
        $summary->save();

        abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

    }

    public function update(Summary $summary)
    {
        $user = auth()->user();

        if ($summary->Section->Course->User == $user or $user->role == 'Admin' ) {
        
            $this->validation();
            
            $summary->update(request(['content']));
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

    public function destroy(Summary $summary)
    {
        $user = auth()->user();

        if ($summary->Section->Course->User == $user or $user->role == 'Admin' ) {
            
            $summary->delete();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

    protected function validation()
    {
        return request()->validate([
            'content' => 'required|min:5|max:1000',
        ]);
    }
}
