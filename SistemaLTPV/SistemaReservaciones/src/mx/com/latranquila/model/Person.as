package mx.com.latranquila.model{
	
	import flash.events.EventDispatcher;
	
	[Bindable]
	public class Person extends EventDispatcher	{
		
		
		public var person_id:Number;
		public var email:String;
		public var phone:String;
		public var firstName:String = "";
		public var lastName1:String = "";
		public var lastName2:String = "";
		public var status:String;
		public var address:String;
		public var city:String;
		public var state:String;
		public var country:String;
		public var postalCode:String;
		public var version:Number;
				
		public function Person(personRecord:Object=null){
			update(personRecord);
		}
		
		public function get fullName():String{
			
			if(!firstName) firstName = "";
			if(!lastName1) lastName1 = "";
			if(!lastName2) lastName2 = "";
			
			var lastName:String = "";
			if(lastName1 != "" && lastName2 != ""){
				lastName = " "+lastName1 +" "+lastName2;
			} else if(lastName1 != ""){
				lastName = " "+lastName1;
			} else if(lastName2 != ""){
				lastName = " "+lastName2;
			}
			
			if(firstName != "" && lastName != ""){
				return " "+firstName +" "+lastName;
			} else if(firstName != ""){
				return " "+firstName;
			} else if(lastName != ""){
				return " "+lastName;
			}else{
				return "";
			}
		}

		/*
		 *
		 */
		public static var validPersonPropertyNames:Object = {
			phone: "phone",
			telephone: "phone",
			address: "address",
			city: "city",
			state: "state",
			country: "country",
			postal_code: "postalCode",
			postalcode: "postalCode",
			postalCode: "postalCode",
			first_name: "firstName",
			firstname: "firstName",
			last_name: "lastName1",
			lastname: "lastName1",
			last_name1: "lastName1",
			lastname1: "lastName1",
			last_name2: "lastName2",
			lastname2: "lastName2",
			version: "version",
			email: "email",
			e_mail: "email",
			person_id: "person_id"
		};		
		
		public function update(personRecord:Object=null):void {
			if(!personRecord) return;
			// Fill the person object's properties from whatever is in the personRecord
			for (var p:String in personRecord){ 
				var propertyName:String = validPersonPropertyNames[p.toLowerCase()];
				if (propertyName) this[propertyName] = personRecord[p];
			}

		}
		
	}
}