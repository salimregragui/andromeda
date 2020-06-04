<?php

namespace App\Http\Controllers;

use App\Course;
use App\Section;
use App\Http\Controllers\NotificationController;
class SectionController extends Controller
{
 
    public function store(Course $course)
    {
         
        $user = auth()->user();

        if ($course->User == $user or $user->role == 'Admin' ) {
        
            $this->validation();

            $section = Section::create([
                'name' => request('name'),
                'number' => request('number'),
                'course_id' => $course->id
            ]);
          
            $notification=new NotificationController;
            $content=[
                'text' => 'Une nouvelle section a ete ajouter au cours'.' '.$course->name ,
                'section_id' => $section->id,
                'course_id' => $course->id
            ];
            $type='Nouvelle section ';
            foreach ($course->Followed as $user) {

                $notification->sendNotification($user,json_encode($content),$type);

            }

            return response()->json(['sectionId' => $section->id]);
        }

        abort(401);
    }

    public function update(Section $section)
    {
        $user = auth()->user();

        if ($section->Course->User == $user or $user->role == 'Admin' ) {
        
            $this->validation();
            $ancien_nom=$section->name;
            $ancien_number=$section->number;

            $section->update(request(['name','number']));
            $section->save();

            if ( $ancien_nom != $section->name or $ancien_number != $section->number ) {
               
                $notification=new NotificationController;
                $type='Update section '; 
                $content=[
                    'text' => 'La section '. $section->name .' du cours '. $section->Course->name .' a ete modifier' ,
                    'section_id' => $section->id,
                    'course_id' => $section->Course->id ,
                    'ancien_nom'=> null,
                    'ancien_number' => $ancien_number
                ];
                
                if ($ancien_nom != $section->name) {
                  $content['ancien_nom']= $ancien_nom;
                  $content['ancien_number']= null ;
                }
                
                foreach ($section->Course->Followed as $user) {
                    $notification->sendNotification($user,json_encode($content),$type);
                }
            }
            
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);
    }

    public function destroy(Section $section)
    {
        $user = auth()->user();

        if ($section->Course->User == $user or $user->role == 'Admin' ) {
            
            $notification=new NotificationController;
            $type='delete section '; 
            $content=[
                'text' => 'La section '. $section->name .' du cours '. $section->Course->name .' a ete supprimer'.' '.$section->name ,
                'course_id' => $section->Course->id ,
                
            ];
            $users = $section->Course->Followed;
            $section->delete();
            
            foreach ($users as $user) {
                $notification->sendNotification($user,json_encode($content),$type);
            }
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
