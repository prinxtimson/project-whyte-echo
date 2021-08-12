<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class ReportController extends Controller
{
    //
    public function velocity()
    {
        //
        $response = Http::withBasicAuth('developertritek@gmail.com', 'NPv8E131oroUMh5D9hzt5178')->get('https://tritekconsultingltd.atlassian.net/rest/greenhopper/1.0/rapid/charts/velocity?rapidViewId=118')->throw()->json();

        return $response;
    }

    public function burnup()
    {
        //
        $response = Http::withBasicAuth('developertritek@gmail.com', 'NPv8E131oroUMh5D9hzt5178')->get('https://tritekconsultingltd.atlassian.net/rest/greenhopper/1.0/rapid/charts/scopechangeburnupchart?rapidViewId=118&sprintId=275')->throw()->json();

        return $response;
    }

    public function burndown()
    {
        //
        $response = Http::withBasicAuth('developertritek@gmail.com', 'NPv8E131oroUMh5D9hzt5178')->get('https://tritekconsultingltd.atlassian.net/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart?rapidViewId=118&sprintId=275')->throw()->json();

        return $response;
    }
}
