<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>EasyEnglish</title>
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>
<div id="root"></div>
<script src="{{mix('js/app.js')}}" ></script>
<div id="doge">
    <div class="centerv doge_height">
        <h1 class="wow_text">WOW, SUCH LITTLE SCREEN</h1>
        <h1 class="wow_text or_use"> TRY ON PC OR USE TELEGRAM BOT </h1>
        <div class="telegram_button_to_bot">
            <a href="https://telegram.me/goosavebot">Easy English</a>
        </div>
        <div class="centerh">
            <img class="doge_img" src="/img/doge.png" alt="doge">
        </div>
    </div>
</div>
</body>
</html>