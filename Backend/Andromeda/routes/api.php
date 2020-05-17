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
    Route::get('user/showall','UserController@index');//* display all Users
    Route::get('user/{id}/show','UserController@show');//* Display the specified User
    Route::post('user/{user}/update','UserController@update');
    Route::delete('user/{user}/delete','UserController@destroy');

    //-------------------------COURSE---------------------------
    Route::get('course/showall','CourseController@index'); //* display all courses
    Route::get('course/{id}/show','CourseController@show');//* display specific course
    Route::get('course/progression','CourseController@courseProgressions');//* display specific course

    //-------------------------NOTIFICATION---------------------------
    Route::get('notification/showall','NotificationController@index'); //* display all notification belongs to currently authenticated user
    Route::get('notification/{notification}','NotificationController@show');//* display specific notification belongs to currently authenticated user
    Route::delete('notification/{notification}','NotificationController@delete');

    //-------------------------DISCUSSION--------------------------------
    Route::get('discussion/','DiscussionController@index');


});

