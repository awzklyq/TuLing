<?php
error_reporting(E_ALL);
set_time_limit(0);
//ob_implicit_flush();

$address = '127.0.0.1';
$port = 8080;
//创建端口
if( ($sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
	echo "socket_create() failed :reason:" . socket_strerror(socket_last_error()) . "\n";
}
// socket_set_option($server, SOL_SOCKET, SO_REUSEADDR, 1);
//绑定
if (socket_bind($sock, $address, $port) === false) {
	echo "socket_bind() failed :reason:" . socket_strerror(socket_last_error($sock)) . "\n";
}

//监听
if (socket_listen($sock, 5) === false) {
	echo "socket_bind() failed :reason:" . socket_strerror(socket_last_error($sock)) . "\n";
}

$sockets = array('s'=>$sock);
$user = array( );
do {
	echo '222222222222222222222222222\n';
	$changes = $sockets;
	@socket_select($changes,$write=NULL,$except=NULL,NULL);
	foreach($changes as $sign)
	{
		if($sign==$sock)
		{
			echo '111111111111111111111\n';
			$client = socket_accept($sock);
			$sockets[] = $client;
			$user = array( 'socket'=>$client, 'hand'=>false );
		}
		else
		{
			echo '333333333333333333333333\n';
			$len=socket_recv($sign,$buffer,2048,0);
			if ( $len < 7 )
			{
				echo '44444444444444444444444444\n';
				//$socket_close($sign);
				continue;
			}
			if ( $user['hand'] == false )
			{
				echo '55555555555555555555\n';
				$buf  = substr($buffer,strpos($buffer,'Sec-WebSocket-Key:')+18);
				$key  = trim(substr($buf,0,strpos($buf,"\r\n")));
				$new_key = base64_encode(sha1($key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11",true));
				$new_message = "HTTP/1.1 101 Switching Protocols\r\n";
				$new_message .= "Upgrade: websocket\r\n";
				$new_message .= "Sec-WebSocket-Version: 13\r\n";
				$new_message .= "Connection: Upgrade\r\n";
				$new_message .= "Sec-WebSocket-Accept: " . $new_key . "\r\n\r\n";
				socket_write( $sign, $new_message, strlen($new_message) );
				$user['hand'] = true;
			}
			else
			{
				echo '666666666666666666666666666\n';
				echo($buffer);
				socket_write( $sign, $buffer, strlen($buffer) );
			}
		}
	}
} while(true);
echo 'send close';
//关闭socket
socket_close($sock);


?>