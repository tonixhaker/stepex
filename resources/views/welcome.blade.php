<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Login!</title>
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body class="overflow-hidden noselect">

    <video class="background-video" autoplay muted loop id="myVideo">
        <source src="video/backlondon.mp4" type="video/mp4">
    </video>
    <div class="welcome-container centerh">
        <div class="centerv">
            <div class="login-container">
                <div class="width100">
                    <h1 class="sitetitle">Easy English</h1>
                    <blockquote>
                        <p>Those who know nothing of foreign languages know nothing of their own.</p>
                        <footer>— <cite> Johann Wolfgang von Goethe</cite></footer>
                    </blockquote>
                    <img class="bus_img" src="/img/pic2.png" alt="">
                </div>
                <div class="width100 buttonbottom">
                    <script async src="https://telegram.org/js/telegram-widget.js?4" data-telegram-login="goosavebot" data-size="large" data-auth-url="/login" data-request-access="write"></script>
                </div>
            </div>
        </div>
    </div>

    </body>
</html>
