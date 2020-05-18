<?php

namespace App\Http\Controllers;

use App\Discussion;

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

            foreach ($user->Discussions as $discussion)
            {
                
                $discussion['users']=$discussion->users;
                $discussion['messages']=$discussion->Messages;
            }

            return response()->json(['Discussions' => $user->Discussions]);

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
                $discussion['messages']=$discussion->Messages;

                return response()->json(['Discussion' => $discussion]); 
               
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

        foreach ($discussion->Users as $user ) {

            if ( $user->id == auth()->user()->id ) { 
        
                auth()->user()->Discussions()->detach($discussion->id);

                if (count($discussion->Users) == 1 ) { //* check if it stay more than one participant  
                    $discussion->delete();
                }

                return response(1 ,200);

            }
        }
       
        return 401;
    }
}
