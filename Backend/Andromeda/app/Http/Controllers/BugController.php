<?php

namespace App\Http\Controllers;

use App\Bug;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\NotificationController;

class BugController extends Controller
{
    //
    public function index()
    {
        $bugs = Bug::all();

        foreach ($bugs as $bug) {
            if ($bug->attachment != null) {
                $bug->attachment=asset(Storage::url('images/'.$bug->attachment));
            }
            if ($bug->User->image != null) {
                $bug->User->image=asset(Storage::url('images/'.$bug->User->image));
            }
        }
        return response()->json(['Bugs' => $bugs]);
    }
    
    private function showApprovedType($type)
    {
        $bugs = Bug::all()->where('approved',$type);

        foreach ($bugs as $bug) {
            if ($bug->attachment != null) {
                $bug->attachment=asset(Storage::url('images/'.$bug->attachment));
            }
            if ($bug->User->image != null) {
                $bug->User->image=asset(Storage::url('images/'.$bug->User->image));
            }
        }
        return response()->json(['Bugs' => $bugs]);
    }

    public function showApproved()
    {
        return $this->showApprovedType(1);
    }
    
    public function showNoneApproved()
    {
        return $this->showApprovedType(0);
    }
    
    public function store()
    {
        try {
            $user = auth()->userOrFail();
            $this->validation();
            if (request()->hasFile('attachment')) {

                $bug = Bug::create([
                    'User_id' => $user->id,
                    'attachment' => Str::random(5).''.time().'.'.Str::random(3).'.'.request()->attachment->getClientOriginalExtension(),
                    'description' => request('description'),
                    'approved' => 0,
                    'repaired' => 0,
                ]);
                request()->attachment->move(public_path('storage/images/'),$bug->image);
                $bug->save();
    
                
                return response()->json(['bugId' => $bug->id]);
            }
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }

        abort(401);
        
    }

    protected function validation()
    {
        return request()->validate([
            "description" => 'required|min:1|max:2048',
            "attachment" => 'required|image|mimes:jpeg,png,jpg,svg,gif|max:2048', //? should the message attachment be only an image ?
        ]);
    }

    public function approved(Bug $bug)
    {
        $bug->approved=1;
        $bug->save();
        //TODO augmenter l'abonement de cette personne d'une semaine
        $notification=new NotificationController;
                $type='Bug Approved '; 
                $content=[
                    'text' => 'Le bug que vous aver signaler a bien ete approuver ' ,
                    'bug_id' => $bug->id,
                ];
        $notification->sendNotification($bug->User,json_encode($content),$type);
        if ($bug->User->image != null) {
            $bug->User->image= asset(Storage::url('images/'.$bug->User->image));
        }
        $bug->attachment=asset(Storage::url('images/'.$bug->attachment));
        return response()->json(['bug' => $bug]);

    }

    public function repaired(Bug $bug)
    {
        $bug->repaired=1;
        $bug->save();

        $notification=new NotificationController;
                $type='Bug repaired'; 
                $content=[
                    'text' => 'Le bug que vous aver signaler a bien ete reparer merci de rendre notre plateforme plus fiable' ,
                    'bug_id' => $bug->id,
                ];
        $notification->sendNotification($bug->User,json_encode($content),$type);
        if ($bug->User->image != null) {
            $bug->User->image= asset(Storage::url('images/'.$bug->User->image));
        }
        $bug->attachment=asset(Storage::url('images/'.$bug->attachment));
        return response()->json(['bug' => $bug]);

    }

    public function noneApproved(Bug $bug)
    {
        $notification=new NotificationController;
                $type='Bug non approuver'; 
                $content=[
                    'text' => 'Le bug que vous aver signaler a bien ete verifier mais n\'a pas ete approuver merci de rendre notre plateforme plus fiable' ,
                    'bug_id' => $bug->id,
                ];
        $notification->sendNotification($bug->User,json_encode($content),$type);
        
        $file_path='storage/images/'.$bug->attachment;

            if (file_exists($file_path) and $bug->attachment != null) {
                unlink($file_path);
            }
            $bug->delete();
            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.    

    }
}
