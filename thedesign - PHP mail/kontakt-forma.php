<?php

$imePrezime = "";
$mobitel = "";
$email = "";
$odabir = "";
$poruka = "";

$_POST = json_decode(file_get_contents('php://input'), true);

if (isset($_POST['ime-prezime'])) {
    $imePrezime = $_POST['ime-prezime'];
}
if (isset($_POST['mobitel'])) {
    $mobitel = $_POST['mobitel'];
}
if (isset($_POST['email'])) {
    $email = $_POST['email'];
}
if (isset($_POST['odabir'])) {
    $odabir = $_POST['odabir'];
}
if (isset($_POST['poruka'])) {
    $poruka = $_POST['poruka'];

    $wrappedPoruka = wordwrap($poruka, 60, "\r\n", true);
}

header("Content-Type: application/json");

if($imePrezime != "" && $mobitel != "" && $email != "" && $wrappedPoruka != ""){
    mail("info@thedesign.hr",
        // naslov
        'Upit - ' . $imePrezime,

        //opis
        $wrappedPoruka . "\r\n<br><br>" .
        "Broj mobitela: " . $mobitel . "\r\n<br>" .
        "Osoba preferira povratni kontakt putem " . $odabir . "-a",

        //headeri
        "From: " . $email . "\r\n" .
        "Content-Type: text/html;charset=utf-8\r\n"
    );
    http_response_code(200);
    echo json_encode([
        "status" => true
    ]);
    return;
} else {
    http_response_code(400);
    echo json_encode([
        "status" => false
    ]);
}
