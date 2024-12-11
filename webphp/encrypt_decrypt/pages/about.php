<!DOCTYPE html>
<html lang="<?php echo $_SESSION['lang']; ?>">
<head>
    <meta charset="UTF-8">
    <title><?php echo $lang['title']; ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav>
        <a href="index.php?page=home"><?php echo $lang['home']; ?></a>
        <a href="index.php?page=about"><?php echo $lang['about']; ?></a>
        <a href="index.php?page=contact"><?php echo $lang['contact']; ?></a>
        <a href="?lang=en">English</a> | <a href="?lang=ar">العربية</a>
    </nav>
    <h1><?php echo $lang['about']; ?></h1>
    <p>...</p>
</body>
</html>
