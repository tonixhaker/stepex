{{--<!DOCTYPE html>--}}
{{--<html lang="en">--}}
{{--<head>--}}
    {{--<meta charset="utf-8">--}}
    {{--<meta http-equiv="X-UA-Compatible" content="IE=edge">--}}
    {{--<meta name="viewport" content="width=device-width, initial-scale=1">--}}

    {{--<title>Logged!</title>--}}

{{--</head>--}}
{{--<body>--}}
{{--<h1>LOGGED!</h1>--}}
{{--{{$_COOKIE['tg_user']}}--}}
{{--<a href="/logout">Logout</a>--}}
{{--</body>--}}
{{--</html>--}}

<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>EasyEnglish</title>
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>
<div id="root"></div>
<script src="{{mix('js/app.js')}}" ></script>
</body>
</html>