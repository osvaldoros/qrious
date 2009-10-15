<?php
require_once("DataSource.php");
require_once("UserAuth.php");

class WebOrbDemoService{

	protected $ds;
	protected $userAuth;

	public function __construct(){
		$this->ds = new DataSource();
		$this->userAuth = new UserAuth();
	}
	
	public function sayPublic($msg){
		return "Ja!, Cualquiera puede decir cosas aqui, a ver tratale en el Autentificado a ver si muy cabron...";
	}
	
	public function sayAuthenticated($msg){
		// check to see if the user is authenticated, if not it will throw an exception
		$this->userAuth->checkCredentials();
		
		return "Nada mal, pero cualquier rol puede llamar este metodo, a ver calale en el de administradores, ahi se separan los hombres de los niños mijo...";
		
	}	
	
	public function sayAdministrator($msg){
		// check to see if the user is authenticated, if not it will throw an exception
		$this->userAuth->checkCredentials("Administrator");
		
		return "Wow tu si me saliste mas cabron que bonito";
		
	}		
	
	
}

?>