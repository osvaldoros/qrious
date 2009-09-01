package mx.com.latranquila.controller{
	
	import flash.events.EventDispatcher;
	
	import mx.com.latranquila.model.Reservation;
	import mx.com.latranquila.web.WebApplication;
	import mx.rpc.remoting.RemoteObject;

	public class Reservations extends EventDispatcher	{
		
		protected var _reservationsRO:RemoteObject
		protected var _webApplication:WebApplication;
		
		public function Reservations(){
			
		}

		public function set webApplication(value:WebApplication):void{
			_webApplication = value;
			_reservationsRO = _webApplication.getService("Reservations");
			
		}
		
 		public function getReservations(startDate:Date=null, stopDate:Date=null):void{
 			_reservationsRO.getReservations({startDate:startDate, stopDate:stopDate});
	    }
	    
	    public function getAvailability(startDate:Date=null, stopDate:Date=null):void{
	    	_reservationsRO.getAvailability({startDate:startDate, stopDate:stopDate});
	    }
	    
	    public function getReservation(reservationId:int):void{
	    	_reservationsRO.getReservation({reservation_id: reservationId })
	    }
	    
	    public function newReservation(reservation:Reservation):void{
	    	_reservationsRO.newReservation({reservation: reservation })
	    }
	    
	    public function updateReservation(reservation:Reservation):void{
	    	_reservationsRO.updateReservation({reservation: reservation })
	    }
	    
	    public function cancelReservation(reservation:Reservation):void{
	    	_reservationsRO.cancelReservation({reservation: reservation })
	    }
	    
	    public function deleteReservation(reservation:Reservation):void{
	    	_reservationsRO.deleteReservation({reservation: reservation })
		}
	}
}