<?php
if ($_POST['phone'] != "" and $_POST['email'] != "") {
	// Для каждого поля формы пишем такой код:
	// $N = $_POST[N];
	// где N - имя поля, указанное в элементе формы: <input name="N"> 
	$name = $_POST['name'];
	$mail = $_POST['email'];
	$number = $_POST['phone'];
	$message = $_POST['message'];
	$file = $_POST['file'];
	// Ваша почта, куда будет приходить письмо
	// Поменяйте свой e-mail
	$to = "zakaz@meykpro.ru";

	// Заголовок письма
	// Поменяйте на свой
	$subject = "Заказ";

	// Текст письма
	// Замените названия полей формы на свои вот так: $N
	$message = "Имя: $name \n E-mail: $mail \n Message: $message \n Number: $number \n file: $file";
	$headers = "Content-type: text/plain; charset=utf-8";

    $send = mail($to, $subject, $message, $headers);

    if ($send == 'true') {
        $json['error'] = 0;
    } else {
        $json['error'] = 1;
    }
    echo json_encode($json);
} else {
    echo json_encode($json['error'] = $_POST['phone']);
}
?>