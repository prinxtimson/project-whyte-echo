<?php

namespace App\Http\Controllers;

use Unirest\Request;

class AttachController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
    public function store(Request $request, $id)
    {
        //
        Request::auth('kososhiprinx@gmail.com', 'Zrp2E2EbGj1kpzbyeGAcA8AC');

        
        $headers = array(
            'Accept' => 'application/json',
            'X-Atlassian-Token' => 'no-check'
        );

        $file = $request->file('file');
        
        $parameters = array(
            'file' => File::add($file->getRealPath())
        );

        $response = Request::post(
            'https://tricomms.atlassian.net/rest/api/2/issue/'.$id.'/attachments',
            $headers,
            $parameters
          );

          return $response;
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
