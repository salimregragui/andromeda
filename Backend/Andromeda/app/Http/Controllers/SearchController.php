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
        
        $data['Courses']=Course::where('name','like','%'.$query.'%')->get();
        $data['Sections']=Section::where('name','like','%'.$query.'%')->get();
        $data['Chapters']=Chapter::where('name','like','%'.$query.'%')->get();
       
        foreach ($data['Chapters'] as $chapter) {
            
            $chapter['course_id']=$chapter->Section->Course->name;
            unset($chapter->Section);
        }
        foreach ($data['Sections'] as $section) {
            
            $section['course_id']=$section->Course->name;
            unset($section->Course);
        }
        
        $data['Resources']=Resource::where('name','like','%'.$query.'%')->get();
        try {
            $data['Tasks']=Task::where([
                ['content','like','%'.$query.'%'],
                ['user_id',auth()->userOrFail()->id]
                ])->get();
        } catch (\Throwable $th) {
            // continue
        }
       
        $data['Users']=User::where('name','like','%'.$query.'%')->get();
        return $data;
    }
}
