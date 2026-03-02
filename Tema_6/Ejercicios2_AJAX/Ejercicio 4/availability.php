<?php
header('Content-Type: application/json; charset=utf-8');
$src = $_SERVER['REQUEST_METHOD'] === 'POST' ? $_POST : $_GET;
$username = isset($src['username']) ? trim($src['username']) : '';
$reserved = ['admin','root','test','usuario','guest','demo'];
$isReserved = in_array(strtolower($username), array_map('strtolower', $reserved), true);
$random = (bool)random_int(0, 1);
$available = !$isReserved && $random;
$suggestions = [];
if (!$available && $username !== '') {
  $base = preg_replace('/[^a-zA-Z0-9_]/','', $username);
  $suggestions = [$base.random_int(1,99), $base.'_ok', $base.'_2026'];
}
echo json_encode([
  'username' => $username,
  'available' => $available,
  'suggestions' => $suggestions
], JSON_UNESCAPED_UNICODE);
