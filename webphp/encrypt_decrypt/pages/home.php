<!DOCTYPE html>
<html lang="<?php echo $_SESSION['lang']; ?>">
<head>
    <meta charset="UTF-8">
    <title><?php echo $lang['title']; ?></title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    
    
    <nav>
        <a href="index.php?page=home"><?php echo $lang['home']; ?></a>
        <a href="index.php?page=about"><?php echo $lang['about']; ?></a>
        <a href="index.php?page=contact"><?php echo $lang['contact']; ?></a>
        <a href="?lang=en">English</a> | <a href="?lang=ar">العربية</a>
    </nav>
    <h1 style="color:red"><?php echo $lang['welcome']; ?></h1>
    
    <select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
</body>
</html>
