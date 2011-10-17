package mx.com.latranquila.model{
	
	import flash.events.EventDispatcher;

	public class Unit extends EventDispatcher	{
		
		public var unit_id:Number;
		public var ownership:Person;
		public var name:String;
		public var capacity:Number;
		
		public function Unit(unitObject:Object){
			update(unitObject);
		}
		
		public static var validUnitPropertyNames:Object = {
			unit_id: "unit_id",
			unitid: "unit_id",
			unitId: "unit_id",
			ownership: "ownership",
			name: "name",
			capacity: "capacity"
		};		
		
		public function update(unitObject:Object=null):void {
			if(!unitObject) return;
			// Fill the unitObject object's properties from whatever is in the unitObject
			for (var p:String in unitObject){ 
				var propertyName:String = validUnitPropertyNames[p.toLowerCase()];
				if (propertyName) {
					if(propertyName == "ownership"){
						this[propertyName] = new Person(unitObject[p]);						
					}else{
						this[propertyName] = unitObject[p];
					}
				}
			}

		}		
		
		
	}
}