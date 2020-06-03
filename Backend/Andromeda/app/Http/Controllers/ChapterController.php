<?php

namespace App\Http\Controllers;

use App\Chapter;
use App\Section;
use App\Http\Controllers\NotificationController;

class ChapterController extends Controller
{

    public function store(Section $section)
    {
       
        $user = auth()->user();

        if ($section->Course->User == $user or $user->role == 'Admin' ) {
            
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
            
            foreach ($chapter->Section->Course->Followed as $user) {
                $notification=new NotificationController;

                $content=[
                    'text' => 'Un nouvau chapitre a ete ajouter a la section '.$section->name.' du cours'.' '.$section->Course->name ,
                    'chapter_id' => $chapter->id,
                    'section_id' => $section->id,
                    'course_id' => $section->Course->id
                ];

                $type='Nouvau chapitre ';
                $notification->sendNotification($user,json_encode($content),$type);
            }
            return response()->json(['chapterId' => $chapter->id]);

        }

        abort(401);
    }

    public function update(Chapter $chapter)
    {
        $user = auth()->user();

        if ($chapter->Section->Course->User == $user or $user->role == 'Admin' ) {
        
            $this->validation();
            $ancienne_video=$chapter->video;
            $yt_url = request()->video;
            $url_parsed_arr = parse_url($yt_url);
            if ( ! ($url_parsed_arr['host'] == "www.youtube.com" && $url_parsed_arr['path'] == "/watch" && substr($url_parsed_arr['query'], 0, 2) == "v=" && substr($url_parsed_arr['query'], 2) != "")) {
                
                abort(400,'Bad Request .');
            
            } 
    
            $chapter->update(request(['name','number','video']));

            if ($chapter->video != $ancienne_video) {
                foreach ($chapter->Section->Course->Followed as $user) {
                    $notification=new NotificationController;
    
                    $content=[
                        'text' => 'Le chapitre ' .$chapter->name.' de la  section '.$chapter->Section->name.' du cours'.' '.$chapter->Section->Course->name.' a ete modifier' ,
                        'chapter_id' => $chapter->id,
                        'section_id' => $chapter->Section->id,
                        'course_id' => $chapter->Section->Course->id
                    ];
    
                    $type='Update chapitre ';
                    $notification->sendNotification($user,json_encode($content),$type);
                }
            }
            $chapter->save();
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
