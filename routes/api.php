<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ProjectController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/issues', [IssueController::class, 'index']);
Route::post('/issues', [IssueController::class, 'store']);
Route::put('/issues/{id}', [IssueController::class, 'update']);
Route::delete('/issues/{id}', [IssueController::class, 'delIssue']);
Route::post('/issues/{id}/comment', [IssueController::class, 'comment']);
Route::delete('/issues/{id}/comment/{commentId}', [IssueController::class, 'delComment']);
Route::post('/issues/{id}/attachments', [IssueController::class, 'attachments']);
Route::post('/issues/{id}/transitions', [IssueController::class, 'transitions']);

Route::get('/projects', [ProjectController::class, 'index']);

Route::get('/sprint', [SprintController::class, 'index']);
Route::post('/sprint', [SprintController::class, 'store']);
Route::put('/sprint/{id}', [SprintController::class, 'update']);
Route::post('/sprint/{id}/issue', [SprintController::class, 'move']);
Route::get('/sprint/{id}/issue', [SprintController::class, 'issue']);

Route::get('/board', [BoardController::class, 'index']);
Route::get('/board/{id}/sprint', [BoardController::class, 'sprint']);
Route::get('/board/{id}/backlog', [BoardController::class, 'backlog']);

Route::post('/epic/{id}/issue', [IssueController::class, 'move']);