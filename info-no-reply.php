<?php

$_POST = json_decode(file_get_contents('php://input'), true);

if (isset($_POST['primatelj-mail'])) {
    $to = $_POST['primatelj-mail'];
    $subject = 'Poruka zaprimljena';
    $defaultPath = "https://thedesign.hr/dokumentacija/pic/new-logo-black.png";
    $imageData = file_get_contents($imagePath);
    $cid = md5(uniqid(time()));
    $message = "
            <html>
            <head>
            <title>Poštovani/a</title>
            </head>
            <body>
                <p style=\"line-height: 0.5;\">Poštovani/a,</p><br>
                <p style=\"line-height: 0.5;\">Zahvaljujemo na ukazanom interesu.</p>
                <p style=\"line-height: 0.5;\"> Javit ćemo se u najkraćem mogućem roku.</p><br>
                <p style=\"line-height: 0.5;\">Molimo da na ovaj mail odgovorite sa privitcima koje smatrate korisnima kako bi što kvalitetnije obradili Vaš upit.</p><br>
                <p style=\"line-height: 0.5;\">Srdačno,</p><br>
                <p style=\"line-height: 0.5; text-decoration: bold;\">The Design</p>
                <p style=\"line-height: 0.5;\">E: <a href='mailto:info@thedesign.hr'>info@thedesign.hr</a></p>
                <p style=\"line-height: 1;\">M: <a href='tel:0993452550'>099 / 345 - 2550</a></p>
                <p style=\"line-height: 0.5;\">FB: <a href='https://www.facebook.com/The.Design.3D'>https://www.facebook.com/The.Design.3D</a></p>
                <p style=\"line-height: 0.5;\">IG: <a href='https://www.instagram.com/the.design.3d/'>https://www.instagram.com/the.design.3d/</a></p><br>
                <img style=\"width: 100px; height: 100px;\" src=\"cid:$cid\">
            </body>
            </html>
            ";

    $headers = "From: info@thedesign.hr\r\n";
    $headers .= "Content-type: text/html;charset=utf-8\r\n";

    mail($to, $subject, $message, $headers);

    http_response_code(201);
}

http_response_code(401);