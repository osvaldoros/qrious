package mx.com.latranquila.model{
	
	import flash.events.EventDispatcher;
	
	import mx.com.latranquila.model.Person;
	import mx.com.latranquila.model.UnitGroup;

	public class Reservation extends EventDispatcher	{
		
		public var person:Person;
		public var unitGroup:UnitGroup;
		public var units:Array;
		public var startDate:Date;
		public var stopDate:Date;
		
		// owner_week or rack
		public var reservation_type:String;
		
		public var subTotal:Number;
		
		
		public function Reservation(){
			
		}
		
	}
}