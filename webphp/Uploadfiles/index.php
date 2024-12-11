<?php
// تحقق من وجود طلب رفع الملف
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // اسم المجلد الذي ستُحفظ فيه الملفات
    $uploadDir = 'files/';

    // تأكد من أن المجلد موجود، وإذا لم يكن موجودًا، قم بإنشائه
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // بيانات الملف المرفوع
    $fileName = $_FILES['uploadedFile']['name'];
    $fileTmpPath = $_FILES['uploadedFile']['tmp_name'];
    $fileError = $_FILES['uploadedFile']['error'];

    // معالجة الأخطاء
    if ($fileError === UPLOAD_ERR_OK) {
        // المسار النهائي لحفظ الملف
        $destination = $uploadDir . basename($fileName);

        // نقل الملف إلى المجلد
        if (move_uploaded_file($fileTmpPath, $destination)) {
            $message = "تم رفع الملف بنجاح: " . htmlspecialchars($fileName);
        } else {
            $message = "حدث خطأ أثناء نقل الملف.";
        }
    } else {
        $message = "فشل رفع الملف. رمز الخطأ: " . $fileError;
    }
}
?>

<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>رفع الملفات</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            direction: rtl;
            text-align: center;
            background-color: #f4f4f4;
            padding: 20px;
        }
        form {
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
        }
        input[type="file"] {
            margin: 15px 0;
        }
        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        .message {
            margin-top: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>رفع الملفات</h1>
    <form action="" method="POST" enctype="multipart/form-data">
        <label for="uploadedFile">اختر الملف:</label>
        <input type="file" name="uploadedFile" id="uploadedFile" required>
        <button type="submit">رفع</button>
    </form>

    <?php if (isset($message)): ?>
        <div class="message"><?php echo $message; ?></div>
    <?php endif; ?>
</body>
</html>
