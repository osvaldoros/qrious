<?php

class Logger{

	protected $logDestination;

	public function __construct(){
		$this->logDestination = $_SERVER['DOCUMENT_ROOT']."/log/log.txt";
		//echo()
	}
	
	public function trace($msg){
		$fh = fopen($this->logDestination, 'a') or die("can't open file");
		$eventTime = new DateTime();
		fwrite($fh, "\n ".$eventTime->format('Y-m-d H:i:s')." ||    ".$msg);
		fclose($fh);
	}
	
}

?>