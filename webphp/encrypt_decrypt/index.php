<?php
// بدء الجلسة
session_start();

// تحديد اللغة الافتراضية
if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'en';
}

// تغيير اللغة إذا تم طلب ذلك
if (isset($_GET['lang'])) {
    $lang = $_GET['lang'];
    if (in_array($lang, ['en', 'ar'])) {
        $_SESSION['lang'] = $lang;
    }
}

// تحميل ملف اللغة
$langFile = __DIR__ . '/lang/' . $_SESSION['lang'] . '.php';
$lang = file_exists($langFile) ? include $langFile : include __DIR__ . '/lang/en.php';

// تحديد الصفحة المطلوبة
$page = $_GET['page'] ?? 'home';
$pageFile = __DIR__ . '/pages/' . $page . '.php';
if (!file_exists($pageFile)) {
    $pageFile = __DIR__ . '/pages/home.php';
}

// تضمين الصفحة
include $pageFile;
?>
