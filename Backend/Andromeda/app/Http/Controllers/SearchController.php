<?php

namespace App\Http\Controllers;

use App\Chapter;
use App\Course;
use App\Resource;
use App\Section;
use App\Task;
use App\User;

class SearchController extends Controller
{
    public function autocomplete($query)
    {
        
        $data =array();

        $data['Courses']=Course::where([['name','like','%'.$query.'%'],['valide',1]])->get();
        $data['Sections']=Section::select('sections.id','sections.number','sections.name as section_name','courses.name as course_name')->leftJoin('courses', 'sections.course_id', '=', 'courses.id')->where([['sections.name','like','%'.$query.'%'],['courses.valide',1]])->get();
        $data['Chapters']=Chapter::select('chapters.name as chapter_name','chapters.number','sections.id as section_id','sections.number as sections_number','sections.name as section_name','courses.name as course_name')->leftJoin('sections', 'chapters.section_id', '=', 'sections.id')->leftJoin('courses', 'sections.course_id', '=', 'courses.id')->where('chapters.name','like','%'.$query.'%')->get();
       
        try {
            $user=auth()->userOrFail();
            
            $data['Tasks']=Task::where([
                ['content','like','%'.$query.'%'],
                ['user_id',$user->id]
                ])->get();

            $data['Resources']=Resource::select('resources.name as resource_name','courses.name as course_name','resources.id as resource_id')->leftJoin('course_user','resources.course_id','=','course_user.course_id')->where('course_user.user_id',$user->id)->leftJoin('courses','course_user.course_id','courses.id')->where([['valide',1],['resources.name','like','%'.$query.'%']])->get();
                
            $data['Users']=User::where('name','like','%'.$query.'%')->where('id','!=',$user->id)->get();//? search all user except this connect user
            return $data;

        } catch (\Throwable $th) {
            // continue
        }
       
        $data['Users']=User::where('name','like','%'.$query.'%')->get();
        return $data;
    }
}
