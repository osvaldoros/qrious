<?php
require_once("DataSource.php");
require_once("UserAuth.php");

class Units{

	protected $ds;
	protected $userAuth;

	public function __construct(){
		$this->ds = new DataSource();
		$this->userAuth = new UserAuth();
	}

    public function getUnits($parameters){
		// check to see if the user is authenticated, if not it will throw an exception
		$this->userAuth->checkCredentials();
		
        return 7;
    }
    
    /**
     * 
     * Gets all the dates available for a specific unit
     * 
     */
    public function getAvailability($parameters){
    	
    }
    
    
    public function getUnit($parameters){
    	
    }
    
    public function newUnit($parameters){
    	
    }
    
    public function updateUnit($parameters){
    }
    
    public function deleteUnit($parameters){
    }
	
}

?>
