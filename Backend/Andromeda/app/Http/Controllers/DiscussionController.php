<?php

namespace App\Http\Controllers;

use App\Discussion;
use App\Message;
use App\User;
class DiscussionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //* display all discussions belongs to the currently authenticated user
        try {
            
            $user = auth()->userOrFail();
            $discussions =[];
            foreach ($user->Discussions as $discussion)
            {
                
                $discussion['users']=$discussion->users;
                $discussion['visibleMessages']= $discussion->Messages->where('created_at','>=',$discussion['pivot']->updated_at);
                   
                $data['created_at']=$discussion['created_at'];
                $data['updated_at']=$discussion['updated_at'];
                $data['id']=$discussion['id'];
                $data['users']=$discussion['users'];
                $data['visibleMessages']=$discussion['visibleMessages'];
                $data['pivot']=$discussion['pivot'];
                $data['type']=$discussion['type'];

                if ($data['visibleMessages']->isNotEmpty() or count($data['users'])>2) { //* to don't display the empty discussion but display discussion if it's group even if it's empty
                    array_push($discussions,$data);   
                }
            }

            return response()->json(['Discussions' => $discussions]);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {

            abort(401);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $discussion
     * @return \Illuminate\Http\Response
     */
    public function show(Discussion $discussion)
    {
        // display the specified discussion
        try { //* check il user are authentificate 
            
            $user = auth()->userOrFail();

            if ($user->Discussions->where('id',$discussion->id)->first() != null) { //* check if the user are attache at this disscussion
   
                $discussion['users']=$discussion->Users;
                $discussion['visibleMessages']= $discussion->Messages->where('created_at','>=',$discussion->users->find($user)->pivot->updated_at);
                   
                $data['created_at']=$discussion['created_at'];
                $data['updated_at']=$discussion['updated_at'];
                $data['id']=$discussion['id'];
                $data['users']=$discussion['users'];
                $data['visibleMessages']=$discussion['visibleMessages'];
                $data['pivot']=$discussion->users->find($user)->pivot;
                $data['type']=$discussion['type'];
                return response()->json(['Discussion' =>$data]);
               
            }
            
            abort(404);
            

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {

            abort(401);
        }  
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $discussion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Discussion $discussion)
    {
        //* check if this discussion belongs to the currently authenticated user
        try {
           
            $user = auth()->userOrFail();
           
            if ( $discussion->Users->find($user))
            {
                if ($discussion->type == 'groupe' ) { //* si c'est une discussion de groupe en le dettache de cette discussion
                   
                    if (count($discussion->users) >=2 ) {
                        
                        $message = new Message() ;                    
                        $message->text=auth()->user()->name.' est parti(e)';
                        $message->attachment="left";
                        $message->user_id=$user->id;
                        $message->discussion_id=$discussion->id;
                        $message->save();
    
                        $user->discussions()->detach($discussion);
                    }
                    else { // si il reste un seule user dans la discussion
                        $discussion->delete();
                    }
    
                }
                else {
                   
                    $user->Discussions->find($discussion)->pivot->update(['updated_at'=> now()]);

                }
                abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.
            }

            abort(401);

        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            
            abort(401);

        }
       
    }

    public function startDiscussion(User $user)
    {
        if (auth()->user() != null) {

            foreach (auth()->user()->Discussions as $discussion ) {
                
                if (count($discussion->Users)== 2 and $discussion->Users->find($user)->id == $user->id ) {
                   
                    $discussion['users']=$discussion->Users;
                    $discussion['visibleMessages']= $discussion->Messages->where('created_at','>=',$discussion['pivot']->updated_at);
                   
                    $data['created_at']=$discussion['created_at'];
                    $data['updated_at']=$discussion['updated_at'];
                    $data['id']=$discussion['id'];
                    $data['users']=$discussion['users'];
                    $data['visibleMessages']=$discussion['visibleMessages'];
                    $data['pivot']=$discussion['pivot'];
                    $data['type']=$discussion['type'];
                    return response()->json(['Discussion' =>$data]);
                }
            }

            abort(204); //Requête traitée avec succès mais pas d’information à renvoyer.

        }

        abort(401);
    }
}
