package mx.com.latranquila.model{
	
	import flash.events.EventDispatcher;

	public class Reservation extends EventDispatcher	{
		
		public var reservation_id:Number;
		public var person:Person;
		public var unitGroup:UnitGroup;
		public var units:Array;
		public var startDate:Date;
		public var stopDate:Date;
		public var cancelled:Boolean;
		
		// owner_week or rack
		public var reservation_type:String;
		
		public var subTotal:Number;
		
		
		public function Reservation(reservationObject:Object){
			update(reservationObject);
		}
		
		public static var validReservationPropertyNames:Object = {
			reservation_id: "reservation_id",
			reservationid: "reservation_id",
			reservationId: "reservation_id",
			person: "person",
			unitGroup: "unitGroup",
			units: "units",
			cancelled: "cancelled",
			startDate: "startDate",
			stopDate: "stopDate",
			reservation_type: "reservation_type",
			subTotal: "subTotal"
			
		};			
		
		public function update(reservationObject:Object):void{
			if(!reservationObject) return;
			// Fill the unitObject object's properties from whatever is in the unitObject
			for (var p:String in reservationObject){ 
				var propertyName:String = validReservationPropertyNames[p.toLowerCase()];
				if (propertyName) {
					if(propertyName == "person"){
						// parse person
						this[propertyName] = new Person(reservationObject[p]);
												
					}else if(propertyName == "units"){
						// parse the array of units
						var unitsArray:Array = reservationObject.units as Array;
						var validUnits:Array = new Array();
						for(var i:int=0; i<unitsArray.length; i++){
							validUnits.push( new Unit( unitsArray[i] ) );
						}
						this.units = validUnits;
						
					}else{
						this[propertyName] = reservationObject[p];
					}
				}
			}			
		}
		
	}
}