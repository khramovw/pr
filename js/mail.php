<?php
	$name = $_GET['name'];
	$tel = $_GET['tel'];
	$email = $_GET['email'];
	$form_name = $_GET['form_name'];
	$lending = $_GET['lending'];
	$shop = $_GET['shop'];

	// echo "Спасибо, $name, Ваш запрос отправлен. Мы свяжемся с Вами по телефону $tel. Форма: $form_name. Опции: $options";
	$to = 'khramovw@gmail.com';
	$messagetext = "Клиент $name отправил запрос. </br>Номер телефона клиента: $tel. ";
	if($email){$messagetext .= " Электронная почта клиента: $email. ";}
	if($lending){$messagetext .= " Лендинг: $lending. ";}
	if($shop){$messagetext .= " Магазин: $shop. ";}
	$headers = "Content-type: text/html; charset=\"utf-8\"\r\n";
	$headers .= "From: from@example.com\r\n"; 
	$headers .= "Reply-To: reply-to@example.com\r\n"; 
	mail($to, 'Запрос с сайта toprated.com.ua', $messagetext, $headers);

?>