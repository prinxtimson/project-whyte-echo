<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->get('https://tricomms.atlassian.net/rest/api/2/project')->throw()->json();

        return $response;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $userField = [
            "emailAddress" => $request['channelEmail'],
            "displayName" => $request['channelName'],
            "notification" => "true",

        ];

        $user = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->post('https://tricomms.atlassian.net/rest/api/2/user', $userField)->throw()->json();

        return $user;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->get('https://tricomms.atlassian.net/rest/api/2/project/'.$id)->throw()->json();

        $boards = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->get('https://tricomms.atlassian.net/rest/agile/1.0/board?projectKeyOrId='.$id)->throw()->json();

        $priority = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->get('https://tricomms.atlassian.net/rest/api/2/priority')->json();

        $response['boards'] = $boards['values'];

        $response['priority'] = $priority;

        return $response;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
