<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Client\RequestException;

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($projectKey)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->get('https://tricomms.atlassian.net/rest/api/2/search?jql=project='.$projectKey.'&maxResults=1000');

        return $response->throw()->json();
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

    public function move(Request $request, $id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->post('https://tricomms.atlassian.net/rest/agile/1.0/epic/'.$id.'/issue', 
            $request->all()
        );

        return $response->throw()->json();
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
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->post('https://tricomms.atlassian.net/rest/api/2/issue', 
            $request->all()
        );

        return $response->throw()->json();
    }

    public function transitions(Request $request, $id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->post('https://tricomms.atlassian.net/rest/api/3/issue/'.$id.'/transitions', 
            $request->all()
        );

        return $response->throw()->json();
    }

    public function getTransitions(Request $request, $id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->get('https://tricomms.atlassian.net/rest/api/3/issue/'.$id.'/transitions');

        return $response->throw()->json();
    }

    public function story_points(Request $request, $id, $boardId)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->put('https://tricomms.atlassian.net/rest/agile/1.0/issue/'.$id.'/estimation?boardId='.$boardId, 
            $request->all()
        );

        return $response->throw()->json();
    }

    public function attachments(Request $request, $id)
    {
        $file = $request->file('file');

        $parameters = fopen($file->getRealPath(), 'r');

        $response = Http::attach('file', $parameters)->withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            'X-Atlassian-Token' => 'no-check',
            "Accept" => 'application/json'
        ])->post('https://tricomms.atlassian.net/rest/api/2/issue/'.$id.'/attachments');

        return $response->json();
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
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->get('https://tricomms.atlassian.net/rest/api/2/issue/'.$id);

        return $response->throw()->json();
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
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->put('https://tricomms.atlassian.net/rest/api/2/issue/'.$id, 
            $request->all()
        );

        return $response->throw()->json();
    }

    public function comment(Request $request, $id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->post('https://tricomms.atlassian.net/rest/api/2/issue/'.$id.'/comment', 
            $request->all()
        );

        return $response->throw()->json();
    }

    public function delComment($id, $commentId)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->delete('https://tricomms.atlassian.net/rest/api/2/issue/'.$id.'/comment'.'/'.$commentId);

        return $response->throw()->json();
    }

    public function delIssue($id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->delete('https://tricomms.atlassian.net/rest/api/2/issue/'.$id);

        return $response->throw()->json();
    }

    public function delAttachment($id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->delete('https://tricomms.atlassian.net/rest/api/2/attachment/'.$id);

        return $response->throw()->json();
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
