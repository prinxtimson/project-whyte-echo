<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>TriComms</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

<!-- Styles -->
<link rel="stylesheet" href="/css/app.css">
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
            .me-lg-auto {
    margin-right: auto !important;
}
        </style>
    </head>
    <body class="antialiased">
        <div id="app" class='min-vh-100'>
            <App></App>
        </div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
