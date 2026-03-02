<?php
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok'=>false,'error'=>'Método no permitido']);
  exit;
}
if (!isset($_FILES['file'])) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'Archivo no recibido']);
  exit;
}
$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'Error en la subida']);
  exit;
}
$allowed = ['image/png'=>'png','image/jpeg'=>'jpg'];
$type = mime_content_type($file['tmp_name']);
if (!isset($allowed[$type])) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'Tipo de archivo no permitido']);
  exit;
}
if ($file['size'] > 2 * 1024 * 1024) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'Archivo demasiado grande']);
  exit;
}
$dir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads';
if (!is_dir($dir)) { mkdir($dir); }
$ext = $allowed[$type];
$name = uniqid('img_', true) . '.' . $ext;
$dest = $dir . DIRECTORY_SEPARATOR . $name;
if (!move_uploaded_file($file['tmp_name'], $dest)) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'No se pudo guardar el archivo']);
  exit;
}
$url = 'uploads/' . $name;
echo json_encode(['ok'=>true,'filename'=>$name,'url'=>$url], JSON_UNESCAPED_UNICODE);
