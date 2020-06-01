<?php

namespace App\Http\Controllers;

use App\Chapter;
use App\Section;

class ChapterController extends Controller
{

    public function store(Section $section)
    {
        $this->validation();

        $yt_url = request()->link;
        $url_parsed_arr = parse_url($yt_url);
        if ( ! ($url_parsed_arr['host'] == "www.youtube.com" && $url_parsed_arr['path'] == "/watch" && substr($url_parsed_arr['query'], 0, 2) == "v=" && substr($url_parsed_arr['query'], 2) != "")) {
            
            abort(400,'Bad Request .');
        
        } 

        $chapter = Chapter::create([
            'name' => request('name'),
            'video' => request('link'),
            'number' => request('number'),
            'section_id' => $section->id
        ]);

        // abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    
        return response()->json(['chapterId' => $chapter->id]);

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
            'link' => 'required|active_url',
        ]);
    }
}
