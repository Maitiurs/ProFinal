<?php

$name = $_POST['name'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$subject = $_POST['subject'];
$message = $_POST['message'];

echo $name. " said:<br/>" .$message;

if (mail('maitechan58@gmail.com', $subject, $message))
{
    echo "mail send";
}
else
{
    echo "Faild to send";
}
?>