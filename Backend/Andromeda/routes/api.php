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
    Route::get('user/showall','UserController@index');
    Route::get('user/{id}/show','UserController@show');
    Route::post('user/{user}/update','UserController@update');
    Route::delete('user/{user}/delete','UserController@destroy');

    //-------------------------COURSE---------------------------
    Route::get('course/showall','CourseController@index');
    Route::get('course/{id}/show','CourseController@show');
    Route::get('course/nouveau/showall','CourseController@nouveau');

    //-------------------------NOTIFICATION---------------------------
    Route::get('notification/{user}/showall','NotificationController@index');
    Route::post('notification/show','NotificationController@show');


    
    // Route::get('notification/{notification}/show','NotificationController@show');


});

