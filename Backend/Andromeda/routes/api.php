<?php

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    // Route::get('notifications', 'AuthController@notifications');
    
    //-------------------------USER---------------------------
    Route::get('user','UserController@index');//* display all Users
    Route::get('user/{user}','UserController@show');//* Display the specified User
    Route::post('user/{user}/update','UserController@update');//* update the specified User
    Route::delete('user/{user}/delete','UserController@destroy');//* delete the specified User

    //-------------------------COURSE---------------------------
    Route::get('course','CourseController@index'); //* display all courses
    Route::get('course/progression','CourseController@courseProgressions');//* display all courses followed with progression
    Route::get('course/{course}','CourseController@show');//* display specific course

    Route::get('follow/{course}','CourseController@follow_unfollow');//* follow and unfollow course

    //-------------------------NOTIFICATION---------------------------
    Route::get('notification','NotificationController@index'); //* display all notification belongs to currently authenticated user
    Route::get('notification/{notification}','NotificationController@show');//* display specific notification belongs to currently authenticated user
    Route::delete('notification/{notification}','NotificationController@destroy');//* delete specific notification belongs to currently authenticated user

    //-------------------------DISCUSSION--------------------------------
    Route::get('discussion/','DiscussionController@index');//* display all discussions belongs to currently authenticated user
    Route::get('discussion/{discussion}','DiscussionController@show');//* display specific discussion belongs to currently authenticated user
    Route::get('discussion/user/{user}','DiscussionController@startDiscussion');
    Route::delete('discussion/quitter-groupe/{discussion}','DiscussionController@quitterGroupe'); //* permet de quitter un groupe
    Route::delete('discussion/{discussion}','DiscussionController@destroy');//* delete specific discussion belongs to currently authenticated user

    //-----------------------------TASK--------------------------------

    Route::get('task/','TaskController@index');//* Display a listing of the tasks.
    Route::get('task/{task}','TaskController@show');//* Display the specified  task.
    Route::post('task/','TaskController@store');//* Store a newly created task in storage.
    Route::put('task/','TaskController@update');//* Update the specified task in storage.
    Route::delete('task/{task}','TaskController@destroy');//* Remove the specified task from storage.




});

