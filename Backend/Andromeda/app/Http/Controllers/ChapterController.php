<?php

namespace App\Http\Controllers;

use App\Chapter;
use App\Section;

class ChapterController extends Controller
{

    public function store(Section $section)
    {
        $this->validation();

        $yt_url = request()->video;
        $url_parsed_arr = parse_url($yt_url);
        if ( ! ($url_parsed_arr['host'] == "www.youtube.com" && $url_parsed_arr['path'] == "/watch" && substr($url_parsed_arr['query'], 0, 2) == "v=" && substr($url_parsed_arr['query'], 2) != "")) {
            
            abort(400,'Bad Request .');
        
        } 

        $chapter = new Chapter(['name','number','video']);
        $chapter->section_id = $section->id;
        $chapter->save();

        abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

    }

    public function update(Chapter $chapter)
    {
        $user = auth()->user();

        if ($chapter->Section->Course->User == $user or $user->role == 'Admin' ) {
        
            $this->validation();

            $yt_url = request()->video;
            $url_parsed_arr = parse_url($yt_url);
            if ( ! ($url_parsed_arr['host'] == "www.youtube.com" && $url_parsed_arr['path'] == "/watch" && substr($url_parsed_arr['query'], 0, 2) == "v=" && substr($url_parsed_arr['query'], 2) != "")) {
                
                abort(400,'Bad Request .');
            
            } 
    
            $chapter->update(request(['name','number','video']));
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Chapter  $chapter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chapter $chapter)
    {
        $user = auth()->user();

        if ($chapter->Section->Course->User == $user or $user->role == 'Admin' ) {
            
            $chapter->delete();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

    protected function validation()
    {
        return request()->validate([
            'name' => 'required',
            'number' => 'required|integer',
            'video' => 'required|active_url',
        ]);
    }
}
