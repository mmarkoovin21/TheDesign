<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$template = "./mail-template.php";

if (isset($_POST['primatelj-mail'])) {
    $to = $_POST['primatelj-mail'];
    $subject = 'The Design - Automatski odgovor';

    if(file_exists($template)){
        $message = file_get_contents($template);
    }else{
        die ("Nije moguće pronaći datoteku!");
    }

    $headers = "From: info@thedesign.hr\r\n";
    $headers .= "Content-type: text/html;charset=utf-8\r\n";

    mail($to, $subject, $message, $headers);

    http_response_code(201);
}

http_response_code(401);