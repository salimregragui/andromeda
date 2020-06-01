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
    
    //-------------------------USER---------------------------
    Route::get('user','UserController@index');//* display all Users
    Route::get('user/{user}','UserController@show');//* Display the specified User
    Route::post('user/{user}/update','UserController@update');//* update the specified User
    Route::delete('user/{user}/delete','UserController@destroy');//* delete the specified User

    //-------------------------COURSE---------------------------

    Route::get('course','CourseController@index'); //* display all courses
    Route::get('course/progression','CourseController@courseProgressions');//* display all courses followed with progression
    Route::get('course/{course}','CourseController@show');//* display specific course
    Route::post('course','CourseController@store')->middleware('CheckProfessor');//* store course
    Route::put('course/{course}','CourseController@update')->middleware('CheckProfessor');//* store course
    Route::delete('course/{course}','CourseController@destroy')->middleware('CheckProfessor');//* delete specific course belongs to currently authenticated Prpfessor

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

    //-----------------------------Comment--------------------------------

    Route::delete('comment/{comment}','CommentController@destroy');

    //-----------------------------Section---------------------------------

    Route::post('section/{course}','SectionController@store')->middleware('CheckProfessor');//* store section
    Route::put('section/{section}','SectionController@update')->middleware('CheckProfessor');//* store section
    Route::delete('section/{section}','SectionController@destroy')->middleware('CheckProfessor');//* delete specific section belongs to currently authenticated Prpfessor
   
    //-----------------------------Chapter--------------------------------------

    Route::post('chapter/{section}','ChapterController@store')->middleware('CheckProfessor');//* store chapter
    Route::put('chapter/{chapter}','ChapterController@update')->middleware('CheckProfessor');//* store chapter
    Route::delete('chapter/{chapter}','ChapterController@destroy')->middleware('CheckProfessor');//* delete specific chapter belongs to currently authenticated Prpfessor
     
    //-----------------------------Summary--------------------------------------

    Route::post('summary/{section}','SummaryController@store')->middleware('CheckProfessor');//* store summary
    Route::put('summary/{summary}','SummaryController@update')->middleware('CheckProfessor');//* store summary
    Route::delete('summary/{summary}','SummaryController@destroy')->middleware('CheckProfessor');//* delete specific summary belongs to currently authenticated Prpfessor
   
    //-----------------------------Resource--------------------------------------
   
    Route::get('resource/','ResourceController@index');
    Route::get('resource/{resource}','ResourceController@show');

});

