<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role', 'status',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

        // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function Courses()
    {
        return $this->hasMany(Course::class);
    }

    public function Followed()
    {
        return $this->belongsToMany('App\Course')->using('App\Course_user');
    }

    public function Notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function Messages()
    {
        return $this->hasMany(Message::class);
    }

    public function Results()
    {
        return $this->hasMany(Result::class);
    }

    public function Subscription()
    {
        return $this->hasOne(Subscription::class);
    }

    public function Bugs()
    {
        return $this->hasMany(Bug::class);
    }

    public function Discussions()
    {
        return $this->belongsToMany(Discussion::class);
    }
}
