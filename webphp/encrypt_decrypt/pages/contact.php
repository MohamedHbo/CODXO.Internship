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
    <h1><?php echo $lang['contact']; ?></h1>
    <form method="POST" action="#">
        <label for="name"><?php echo $lang['name']; ?>:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="email"><?php echo $lang['email']; ?>:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="message"><?php echo $lang['message']; ?>:</label>
        <textarea id="message" name="message" required></textarea>
        <br>
        <button type="submit"><?php echo $lang['submit']; ?></button>
    </form>
</body>
</html>
