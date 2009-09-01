<?php
require_once("DataSource.php");
require_once("UserAuth.php");
require_once("Logger.php");

class Reservations{

	protected $ds;
	protected $userAuth;
	protected $logger;

	public function __construct(){
		$this->ds = new DataSource();
		$this->userAuth = new UserAuth();
		$this->logger = new Logger();
	}

    public function getReservations($parameters){
		// check to see if the user is authenticated, if not it will throw an exception
		$this->userAuth->checkCredentials();
		
		$startDate = $parameters["startDate"];
		$stopDate = $parameters["stopDate"];
		$cancelled = $parameters["cancelled"];
		
		// connect to the database where the settings are, execute the query and make sure records are returned
		$this->ds->connect();		
		
		//Create the query to return the reservations
		$reservationSQL = "";
		$reservationSQL .=	"SELECT * FROM ltpv_reservation ";
		$reservationSQL .=	"WHERE 1 ";
		if($startDate) $reservationSQL .= "AND startDate >= '".$startDate."' ";
		if($stopDate) $reservationSQL .= "AND stopDate <= '".$stopDate."' ";

		$this->logger->trace("Reservations.getReservations > ".$reservationSQL);

		$reservationRecords = $this->ds->query($reservationSQL);
		$reservationsCount = mysql_num_rows($reservationRecords);
		$reservations = array();
		
		for ( $i = 0; $i < $reservationsCount; $i ++) {
	
			$reservation = mysql_fetch_object($reservationRecords);
			$this->logger->trace("Reservations.getReservations > Inside the loop");
			
			//Get the units related to that reservation
			$reservationUnitsSQL = "";
			$reservationUnitsSQL .= "SELECT * FROM ltpv_reservation_unit ";
			$reservationUnitsSQL .= "WHERE reservation_id = '".$reservation->reservation_id."' ";
			
			$this->logger->trace("Reservations.getReservations > ".$reservationUnitsSQL);
			$reservationUnits = $this->ds->query($reservationUnitsSQL);
			$reservation->units = $reservationUnits;
			
			
			$this->logger->trace("Reservations.getReservations > After units");
			//Get the person related to this reservation
			// We could get this in the same query but its easier to put it as property of the reservation object
			$personSQL = "
				SELECT * FROM ltpv_person
				WHERE person_id = '".$reservation->person_id."'
			";
			$this->logger->trace("Reservations.getReservations > ".$personSQL);
			$person = $this->ds->query($personSQL);
			$reservation->person = mysql_fetch_object($person);
			
			array_push($reservations, $reservation);
			
		}
		
		$this->ds->disconnect();
				
		return $reservations;
		
    }
    
    /**
     * 
     * Gets all the units available for a specific date range
     * 
     */
    public function getAvailability($parameters){
    	
    }
    
    
    public function getReservation($parameters){
    	
    }
    
    public function newReservation($parameters){
    	
    }
    
    public function updateReservation($parameters){
    }
    
    public function cancelReservation($parameters){
    	
    }
    
    public function deleteReservation($parameters){
    }
	
}

?>
