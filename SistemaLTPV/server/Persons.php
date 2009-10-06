<?php
require_once("DataSource.php");
require_once("UserAuth.php");


class Persons{

	protected $ds;
	protected $userAuth;

	public function __construct(){
		$this->ds = new DataSource();
		$this->userAuth = new UserAuth();
	}

    public function getPersons($parameters){
		// check to see if the user is authenticated, if not it will throw an exception
		$this->userAuth->checkCredentials();
		
        return 7;
    }
    
    public function getPerson($parameters){
    	
    	
    }
    
    public function newPerson($parameters){
    	
    }
    
    public function updatePerson($parameters){
    	
    }
    
    public function deletePerson($parameters){
    	
    }
    
    
	
}

?>
