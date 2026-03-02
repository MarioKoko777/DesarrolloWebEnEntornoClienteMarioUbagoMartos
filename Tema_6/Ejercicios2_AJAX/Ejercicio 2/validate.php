<?php
header('Content-Type: application/xml; charset=utf-8');
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

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<validation>';
echo '<method>'.htmlspecialchars($method, ENT_QUOTES, 'UTF-8').'</method>';
echo '<birth valid="'.($validDate ? 'true' : 'false').'">'.htmlspecialchars($birth, ENT_QUOTES, 'UTF-8').'</birth>';
echo '<zip valid="'.($validZip ? 'true' : 'false').'">'.htmlspecialchars($zip, ENT_QUOTES, 'UTF-8').'</zip>';
echo '<phone valid="'.($validPhone ? 'true' : 'false').'">'.htmlspecialchars($phone, ENT_QUOTES, 'UTF-8').'</phone>';
echo '</validation>';
