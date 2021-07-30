<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class SprintController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        //

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
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->post('https://tricomms.atlassian.net/rest/agile/1.0/sprint', 
            $request->all()
        );

        return $response->throw()->json();
    }

    public function move(Request $request, $id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->post('https://tricomms.atlassian.net/rest/agile/1.0/sprint/'.$id.'/issue', 
            $request->all()
        );

        return $response->throw()->json();
    }

    public function issue($id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->get('https://tricomms.atlassian.net/rest/agile/1.0/sprint/'.$id.'/issue'
        );

        return $response->throw()->json();
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
        ])->put('https://tricomms.atlassian.net/rest/agile/1.0/sprint'.'/'.$id, 
            $request->all()
        );

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
