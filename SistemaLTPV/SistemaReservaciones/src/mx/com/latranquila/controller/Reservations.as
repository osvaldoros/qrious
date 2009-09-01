package mx.com.latranquila.controller{
	
	import flash.events.EventDispatcher;
	
	import mx.collections.ArrayCollection;
	import mx.com.latranquila.model.Reservation;
	import mx.com.latranquila.web.WebApplication;
	import mx.controls.Alert;
	import mx.rpc.AsyncToken;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.remoting.RemoteObject;

	public class Reservations extends EventDispatcher	{
		
		protected var _reservationsRO:RemoteObject;
		protected var _webApplication:WebApplication;
		
		[Bindable]
		public var reservationsCollection:ArrayCollection;		
		
		public function Reservations(){
			reservationsCollection = new ArrayCollection();
		}

		public function set webApplication(value:WebApplication):void{
			_webApplication = value;
			_reservationsRO = _webApplication.getService("Reservations");
			
			_reservationsRO.getReservations.addEventListener(ResultEvent.RESULT, getReservationsResult);
			 
			_reservationsRO.getReservations.addEventListener(FaultEvent.FAULT, reservationsFault); 
			_reservationsRO.getAvailability.addEventListener(FaultEvent.FAULT, reservationsFault); 
			_reservationsRO.getReservation.addEventListener(FaultEvent.FAULT, reservationsFault); 
			_reservationsRO.newReservation.addEventListener(FaultEvent.FAULT, reservationsFault); 
			_reservationsRO.updateReservation.addEventListener(FaultEvent.FAULT, reservationsFault); 
			_reservationsRO.cancelReservation.addEventListener(FaultEvent.FAULT, reservationsFault); 
			_reservationsRO.deleteReservation.addEventListener(FaultEvent.FAULT, reservationsFault); 
			
		}
		
 		public function getReservations(startDate:Date=null, stopDate:Date=null, cancelled:Boolean=false):void{
 			_reservationsRO.getReservations({startDate:startDate, stopDate:stopDate, cancelled:cancelled});
	    }
	    
	    public function getAvailability(startDate:Date=null, stopDate:Date=null):void{
	    	_reservationsRO.getAvailability({startDate:startDate, stopDate:stopDate});
	    }
	    
	    public function getReservation(reservationId:int, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _reservationsRO.getReservation({reservation_id: reservationId })
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function newReservation(reservation:Reservation, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _reservationsRO.newReservation({reservation: reservation })
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function updateReservation(reservation:Reservation, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _reservationsRO.updateReservation({reservation: reservation })
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function cancelReservation(reservation:Reservation, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _reservationsRO.cancelReservation({reservation: reservation })
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function deleteReservation(reservation:Reservation, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _reservationsRO.deleteReservation({reservation: reservation })
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
		}
		
		
		protected function getReservationsResult(event:ResultEvent):void{
			reservationsCollection.removeAll();
	    	for each(var reservationObject:Object in event.result){
	    		reservationsCollection.addItem(new Reservation(reservationObject));
	    	}
		}
		
		protected function reservationsFault(event:FaultEvent):void{
			Alert.show("Error:" + event.fault.message, "Reservations Error");
		}
		
	}
}