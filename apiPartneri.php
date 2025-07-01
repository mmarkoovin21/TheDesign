<?php
$dir = __DIR__ . '/dokumentacija/partners';
$files = array_diff(scandir($dir), array('..', '.'));
$images = [];
foreach ($files as $file) {
    if (preg_match('/\.(avif|jpg|jpeg|png|gif)$/i', $file)) {
        $images[] = $file;
    }
}
header('Content-Type: application/json');
echo json_encode($images);
?>