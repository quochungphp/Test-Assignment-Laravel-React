<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrganisationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/






  Route::get('/user/index', [UserController::class, 'index']);
  Route::put('/user/update/{id?}', [UserController::class, 'update']);
  Route::put('/user/create', [UserController::class, 'create']);
  Route::delete('/user/delete/{id?}', [UserController::class, 'delete']);
  Route::get('/user/get-info/{id?}', [UserController::class, 'get']);
  Route::get('/organisation/index', [OrganisationController::class, 'index']);
  Route::post('/organisation/save/{id?}', [OrganisationController::class, 'save']);
  Route::delete('/organisation/delete/{id?}', [OrganisationController::class, 'delete']);
  Route::get('/organisation/get-info/{id?}', [OrganisationController::class, 'get']);
