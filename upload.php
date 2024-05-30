<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "File is not an image.<br>";
        $uploadOk = 0;
    }

    // Check file size (10MB limit)
    if ($_FILES["image"]["size"] > 10000000) { // 10MB limit
        echo "Sorry, your file is too large.<br>";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br>";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.<br>";
    // if everything is ok, try to upload file
    } else {
        $imageData = file_get_contents($_FILES["image"]["tmp_name"]);
        $base64Image = 'data:image/' . $imageFileType . ';base64,' . base64_encode($imageData);
        echo '<img src="' . $base64Image . '" alt="Uploaded Image"><br>';
        echo "File name: " . htmlspecialchars(basename($_FILES["image"]["name"])). "<br>";
        echo "File type: " . $check["mime"] . "<br>";
        echo "File size: " . $_FILES["image"]["size"] . " bytes<br>";
    }
} else {
    echo "No file uploaded.";
}
?>
