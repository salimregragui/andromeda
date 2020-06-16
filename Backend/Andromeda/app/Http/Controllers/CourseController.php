<?php

namespace App\Http\Controllers;

use App\Course;
use App\Progression;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    
    private function show_courses($type)
    {
        // Display all  courses with all sections and chapters order by popular 
   
        $courses=Course::all()->where('valide',$type);
        
        
        foreach ($courses as $course) 
        {
            $cptChapter=0; //compteur de chapitre dans chaque cours
            if ($course->image != null) {
                $course->image=asset(Storage::url('images/'.$course->image));
            }
            
            $course['suivis']=$course->Followed()->count(); // nombre d'user qui suivent ce cours 
            
            foreach ($course->Followed as $user) {
                
                $user->Progressions->where('course_id',$course->id)->first();
              
                if ($user->image != null) {
                    $user->image=asset(Storage::url('images/'.$user->image));
                }
            }

            foreach ($course->Sections as $section) 
            {
              $section->Summary;

              foreach ($section->Chapters as $chapter) 
                {
                    $cptChapter++;
                    
                }
            }

            $course['numberOfChapter']=$cptChapter; // nombre de chapitre dans se cours 
        }

        return ['courses' => $courses->sortByDesc('suivis')->values()->all()]; // order by popular 
    }

    public function show(Course $course)
    {
        // Display the specified course with all sections and chapters
        $cptChapter=0; //compteur de chapitre dans chaque cours

        if ($course->image =!null) {
            $course->image=asset(Storage::url('images/'.$course->image));
        }

        $course['suivis']=$course->Followed()->count(); // nombre d'user qui suivent ce cours 
        
        foreach ($course->Sections as $section) 
        {
            $section->Summary;

            foreach ($section->Chapters as $chapter) 
            {
                $cptChapter++;
            }
        }

        $course['numberOfChapter']=$cptChapter; // nombre de chapitre dans se cours 
        
        return response()->json(['course' => $course]);
    }
    
    public function courseProgressions()
    {
        try {
            
            $user = auth()->userOrFail();

            if ($user->Followed->isNotEmpty())
            {
                $data =[] ;
                foreach ($user->followed as $course) 
                {
                   if($course->valide == 1)
                   {
                        $cptChapter=0; //compteur de chapitre dans chaque cours
        
                        $course['suivis']=$course->Followed()->count(); // nombre d'user qui suivent ce cours 
                        $course['image'] = asset(Storage::url('images/'.$course->image));
                        $course['progression']=$user->progression($course);//la progression 
        
                        foreach ($course->Sections as $section) 
                        {
                            foreach ($section->Chapters as $chapter) 
                            {
                                $cptChapter++;
                            }
                        }
            
                        $course['numberOfChapter']=$cptChapter; // nombre de chapitre dans se cours 
                        array_push($data,$course);
                   }
                }
    
                return response()->json(['Courses' => $data]);
                
            }

            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }
    }

    public function follow_unfollow(Course $course)
    {
        
        try {
            
            $user = auth()->userOrFail();
            
            if ($user->followed->where('pivot.course_id',$course->id)->isEmpty()) {
                
                $progressionNew= new Progression();
                $progressionNew->user_id=$user->id;
                $progressionNew->course_id=$course->id;
                if ($course->Sections->isEmpty()) {
                    $progressionNew->chapter_id=null;
                }
                else{
                    $progressionNew->chapter_id=$course->Sections[0]->Chapters[0]->id;//* il sont par ordre asc see model
                }
                $progressionNew->save();

                $user->Followed()->attach($course);

            }
            else {

                $user->Followed()->detach($course);
                $user->progression($course)->delete();
                
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.

            }

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {

            abort(401);

        }
    }

    public function store()
    {
        $this->validation();
        if (request()->hasFile('image')) {

            $course = Course::create([
                'name' => request('name'),
                'description' => request('description'),
                'rating' => request('rating'),
                'user_id' => auth()->user()->id,
                'image' => Str::random(5).''.time().'.'.Str::random(3).'.'.request()->image->getClientOriginalExtension(),
                'valide' =>  auth()->user()->role =='Admin' and auth()->user()->status == 'Active' ? 1 : 0
            ]);
            request()->image->move(public_path('storage/images/'),$course->image);
            $course->save();

            $this->follow_unfollow($course);// the prof when he create a course he automaticly fillow the course
            
            return response()->json(['courseId' => $course->id]);
        }
        
        abort(400);

    }

    public function update(Course $course)
    {   
        $user = auth()->user();

        if ($course->User == $user or $user->role == 'Admin' and request()->hasFile('image')) {
        
            $this->validation();
            $extention=request()->image->getClientOriginalExtension();
            $file_path='storage/resources/'.$course->image;
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $course->update(request(['name','description','rating']));
            $course->image=Str::random(5).''.time().'.'.Str::random(3).''.$extention;
            request()->image->move(public_path('storage/images/'),$course->image);
            $course->save();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);

    }

    protected function validation()
    {
        $validator = Validator::make(request()->json()->all(), [
            'name' => 'required',
            'description' => 'required',
            'rating' => 'nullable|numeric|min:0|max:5',
            'image' => 'required|image|mimes:jpeg,png,jpg,svg,gif|max:2048',
        ]);

        return $validator;
    }
    
    public function destroy (Course $course)
    {


        $user = auth()->user();

        if ($course->User == $user or $user->role == 'Admin' ) {
            $file_path='storage/images/'.$course->image;

            if (file_exists($file_path) and $course->image != null) {
                unlink($file_path);
            }
            $course->delete();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

        }

        abort(401);

    }

    public function index()
    {
        return $this->show_courses(1);
    }

    public function invalideCourses()
    {
        return $this->show_courses(0);

    }

    public function valide(Course $course)
    {
        $course->valide = 1;
        $course->save();
        return $course;
    }
}
