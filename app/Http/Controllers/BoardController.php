<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->get('https://tricomms.atlassian.net/rest/agile/1.0/board?projectKeyOrId=PW');

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function sprint($id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->get('https://tricomms.atlassian.net/rest/agile/1.0/board/'.$id.'/sprint')->json();

        $sprints = array();

        foreach($response['values'] as $val) {
            $res = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->withHeaders([
                "Content-Type" => "application/json",
                "Accept" => 'application/json'
            ])->get('https://tricomms.atlassian.net/rest/agile/1.0/sprint/'.$val['id'].'/issue'
            )->json();
            $val['issues'] = $res['issues'];
            array_push($sprints, $val);
        }

        return $sprints;
    }

    public function backlog($id)
    {
        //
        $response = Http::withBasicAuth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC')->get('https://tricomms.atlassian.net/rest/agile/1.0/board/'.$id.'/backlog')->throw()->json();

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
