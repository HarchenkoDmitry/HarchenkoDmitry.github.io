<?php

$name = $_POST['name'];
$email = $_POST['email'];
$question = $_POST['question'];

//удаляем спец символы
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$question = htmlspecialchars($question);

// декодируем url если пользователь добавл в форму
$name = urldecode($name);
$email = urldecode($email);
$question = urldecode($question);


// удаляем пробелы с начала и с конца строк
$name = trim($name);
$email = trim($email);
$question = trim($question);

mail("skindustriya@yandex.ru", "Заявка с сайта", "Имя:".$name.". E-mail: ".$email.". Вопрос: ".$question  ,"From: qiwisbi@yandex.ru \r\n");

?>