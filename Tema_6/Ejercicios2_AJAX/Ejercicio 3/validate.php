<?php
header('Content-Type: text/html; charset=utf-8');
$method = $_SERVER['REQUEST_METHOD'];
$src = $method === 'POST' ? $_POST : $_GET;
$birth = isset($src['birthdate']) ? trim($src['birthdate']) : '';
$zip = isset($src['zip']) ? trim($src['zip']) : '';
$phone = isset($src['phone']) ? trim($src['phone']) : '';

$validDate = false;
if ($birth !== '') {
  if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $birth)) {
    $dt = DateTime::createFromFormat('Y-m-d', $birth);
    $validDate = $dt && $dt->format('Y-m-d') === $birth;
  } elseif (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $birth)) {
    $dt = DateTime::createFromFormat('d/m/Y', $birth);
    $validDate = $dt && $dt->format('d/m/Y') === $birth;
  }
}
$validZip = preg_match('/^\d{5}$/', $zip) === 1;
$validPhone = preg_match('/^\d{9}$/', $phone) === 1;

function flag($ok) { return $ok ? 'SI es válido' : 'NO es válido'; }

echo '<div>';
echo '<h2>Resultado de validación</h2>';
echo '<p>Método: '.$method.'</p>';
echo '<p>La fecha de nacimiento ['.htmlspecialchars($birth, ENT_QUOTES, 'UTF-8').'] '.flag($validDate).'</p>';
echo '<p>El código postal ['.htmlspecialchars($zip, ENT_QUOTES, 'UTF-8').'] '.flag($validZip).'</p>';
echo '<p>El teléfono ['.htmlspecialchars($phone, ENT_QUOTES, 'UTF-8').'] '.flag($validPhone).'</p>';
echo '</div>';
