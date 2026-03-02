<?php
header('Content-Type: application/json; charset=utf-8');
$key = getenv('AEMET_API_KEY');
if (!$key) {
  http_response_code(500);
  echo json_encode(['error'=>'Falta AEMET_API_KEY en el entorno']);
  exit;
}
$base = 'https://opendata.aemet.es/opendata/api';
$action = isset($_GET['action']) ? $_GET['action'] : '';
function get_json($url) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 20);
  $resp = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($code < 200 || $code >= 300 || $resp === false) return null;
  return $resp;
}
function get_hateoas($endpoint, $key) {
  $url = $endpoint.'?api_key='.$key;
  $meta = get_json($url);
  if (!$meta) return null;
  $j = json_decode($meta, true);
  if (!isset($j['datos'])) return null;
  $datos = get_json($j['datos']);
  if (!$datos) return null;
  return $datos;
}
if ($action === 'municipios') {
  $datos = get_hateoas($base.'/maestro/municipios', $key);
  if (!$datos) { http_response_code(502); echo json_encode(['error'=>'Fallo obteniendo municipios']); exit; }
  echo $datos;
  exit;
}
if ($action === 'diaria' || $action === 'horaria') {
  $id = isset($_GET['id']) ? $_GET['id'] : '';
  if (!$id) { http_response_code(400); echo json_encode(['error'=>'Falta id']); exit; }
  $endpoint = $base.'/prediccion/especifica/municipio/'.($action === 'diaria' ? 'diaria' : 'horaria').'/'.$id;
  $datos = get_hateoas($endpoint, $key);
  if (!$datos) { http_response_code(502); echo json_encode(['error'=>'Fallo obteniendo predicción']); exit; }
  echo $datos;
  exit;
}
http_response_code(400);
echo json_encode(['error'=>'Acción no válida']);
