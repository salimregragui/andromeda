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
    Route::get('user/{name}','UserController@show');//* Display the specified User
    Route::post('user/{user}/update','UserController@update');//* update the specified User
    Route::post('user/{user}/banned','UserController@banned')->middleware('CheckAdmin');//* bannir un user
    Route::post('user/{user}/unbanned','UserController@unbanned')->middleware('CheckAdmin');//* bannir un user
    Route::post('user/{user}/profile-photo','UserController@profile_photo');//* update and add profile image
    Route::delete('user/{user}/delete','UserController@destroy');//* delete the specified User

    //-------------------------COURSE---------------------------

    Route::get('course','CourseController@index'); //* display all valide  courses
    Route::get('course/invalide','CourseController@invalideCourses');//* display all invalide  courses
    Route::get('course/progression','CourseController@courseProgressions');//* display all courses followed with progression
    Route::get('course/{course}','CourseController@show');//* display specific course
    Route::post('course','CourseController@store')->middleware('CheckProfessor');//* store course
    Route::put('course/{course}','CourseController@update')->middleware('CheckProfessor');//* store course
    Route::delete('course/{course}','CourseController@destroy')->middleware('CheckProfessor');//* delete specific course belongs to currently authenticated Prpfessor

    Route::get('follow/{course}','CourseController@follow_unfollow');//* follow and unfollow course

    //-------------------------NOTIFICATION---------------------------
    Route::get('notification','NotificationController@index'); //* display all notification belongs to currently authenticated user
    Route::get('notification/{notification}','NotificationController@show');//* display specific notification belongs to currently authenticated user
    Route::put('notification/{notification}','NotificationController@seen');//* make the specific notification belongs to currently authenticated user seen
    Route::delete('notification/{notification}','NotificationController@destroy');//* delete specific notification belongs to currently authenticated user

    //-------------------------DISCUSSION--------------------------------
    Route::get('discussion/','DiscussionController@index');//* display all discussions belongs to currently authenticated user
    Route::get('discussion/{discussion}','DiscussionController@show');//* display specific discussion belongs to currently authenticated user
    Route::get('discussion/user/{user}','DiscussionController@startDiscussion');
    Route::delete('discussion/quitter-groupe/{discussion}','DiscussionController@quitterGroupe'); //* permet de quitter un groupe
    Route::delete('discussion/{discussion}','DiscussionController@destroy');//* delete specific discussion belongs to currently authenticated user

    //-----------------------------Message--------------------------------
    Route::post('message/send/{type}','MessageController@send');//* send message type=groupe or prive
    Route::delete('message/{message}','MessageController@destroy');

    //-----------------------------TASK--------------------------------

    Route::get('task/','TaskController@index');//* Display a listing of the tasks.
    Route::get('task/{task}','TaskController@show');//* Display the specified  task.
    Route::post('task/','TaskController@store');//* Store a newly created task in storage.
    Route::put('task/{task}','TaskController@update');//* Update the specified task in storage.
    Route::delete('task/{task}','TaskController@destroy');//* Remove the specified task from storage.

    //-----------------------------Comment--------------------------------
    Route::get('comment/course/{course}','CommentController@index');
    Route::get('comment/chapter/{chapter}','CommentController@show');
   
    Route::post('comment/{chapter}','CommentController@store');
    Route::put('comment/{comment}','CommentController@update');
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
    Route::post('resource/{course}','ResourceController@store')->middleware('CheckProfessor');//* store resource
    Route::put('resource/{resource}','ResourceController@update')->middleware('CheckProfessor');//* update resource
    Route::delete('resource/{resource}','ResourceController@destroy')->middleware('CheckProfessor');//* delete resource

    //-----------------------------Quiz--------------------------------------

    Route::get('quizzes/{course}','QuizController@index'); //* display all quizzes belongs this course with all questions
    Route::get('quiz/{section}','QuizController@show'); //* display the quiz belongs to this section with all questions
    Route::post('quiz/{section}','QuizController@store')->middleware('CheckProfessor');//* store quiz
    Route::delete('quiz/{quiz}','QuizController@destroy')->middleware('CheckProfessor'); //* delete the quiz 

    //-----------------------------Question--------------------------------------

    Route::post('question/{quiz}','QuestionController@store')->middleware('CheckProfessor');
    Route::put('question/{question}','QuestionController@update')->middleware('CheckProfessor');
    Route::delete('question/{question}','QuestionController@destroy')->middleware('CheckProfessor');

    //-----------------------------Search--------------------------------------
    Route::get('search/autocomplete/{query}','SearchController@autocomplete');

    //-----------------------------Comment--------------------------------------
    
    Route::post('comment/response/{comment}','ResponseController@store');
    Route::delete('response/{response}','ResponseController@destroy');

    //-----------------------------Like--------------------------------------

    Route::get('like-unlike-comment/{comment}','LikeController@like_unlike_comment');
    Route::get('like-unlike-response/{response}','LikeController@like_unlike_response');

    //-----------------------------Note & Comment Course --------------------------------------

    Route::post('comment-course/{course}','ProgressionController@store');
});

