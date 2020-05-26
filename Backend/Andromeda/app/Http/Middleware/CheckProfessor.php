<?php

namespace App\Http\Middleware;

use Closure;

class CheckProfessor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {

            $user = auth()->userOrFail();
            
            if ( ! ($user->role == 'Admin' or $user->role == 'Professor') ) {
                abort(401);
            }
            
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            abort(401);
        }

        return $next($request);
    }
}
