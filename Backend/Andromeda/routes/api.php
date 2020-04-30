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
    Route::get('user/showall','UserController@index');
    Route::get('user/{id}/show','UserController@show');
    Route::post('user/{user}/update','UserController@update');
    Route::delete('user/{user}/delete','UserController@destroy');


});

