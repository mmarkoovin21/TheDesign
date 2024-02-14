<?php

if (isset($_POST['primatelj-mail'])) {
    mail($_POST['primatelj-mail'], 'Poruka zaprimljena',
        "Poštovani," . "<br>\r\n" .
        "<br>\r\n" .
        "zaprimili smo Vašu poruku i uskoro ćemo Vam se javiti povratno." . "<br>\r\n" . 
        "<br>\r\n" . 
        "Lijep pozdrav." . "<br>\r\n" .
        "<br>\r\n" .
        "<h3>Vaš The Design</h3>" . "<br>\r\n<br>\r\n" .
        "<br>\r\n<br>\r\n" .
        "<p>Ova poruka je poslana putem servisa. Molimo da ne odgovarate na nju.</p>",
        "From: info@thedesign.hr" . "\r\n" .
        "Content-type: text/html;charset=utf-8"
    );
}