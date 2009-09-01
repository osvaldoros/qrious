package mx.com.latranquila.controller{
	
	import flash.events.EventDispatcher;
	
	import mx.com.latranquila.model.Person;
	import mx.com.latranquila.web.WebApplication;
	import mx.rpc.remoting.RemoteObject;

	public class Persons extends EventDispatcher	{
		
		protected var _personsRO:RemoteObject;
		protected var _webApplication:WebApplication;
		
		public function Persons(){
			
		}
		
		public function set webApplication(value:WebApplication):void{
			_webApplication = value;
			_personsRO = _webApplication.getService("Persons");
			
			
		}
		
		public function getPersons(query:String=null, owners:Boolean=true, notOwners:Boolean=true):void{
			_personsRO.getPersons({query:query, owners:owners, notOwners:notOwners})
	    }
	    
	    public function getPerson(person_id:int):void{
	    	_personsRO.getPerson({person_id:person_id});
	    }
	    
	    public function newPerson(person:Person):void{
	    	_personsRO.newPerson({person:person})
	    }
	    
	    public function updatePerson(person:Person):void{
	    	_personsRO.updatePerson({person:person})
	    	
	    }
	    
	    public function deletePerson(person:Person):void{
	    	_personsRO.deletePerson({person:person})
	    }
		
	}
}