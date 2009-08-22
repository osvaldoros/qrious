﻿<?php
require_once("DataSource.php");
require_once("UserAuth.php");

class Reservations{

	protected $ds;
	protected $userAuth;

	public function __construct(){
		$this->ds = new DataSource();
		$this->userAuth = new UserAuth();
	}

    public function getModuleData(){
		// check to see if the user is authenticated, if not it will throw an exception
		$this->userAuth->checkCredentials();
        return 7;
    }
	
}

?>
