package mx.com.latranquila.controller{
	
	import flash.events.EventDispatcher;
	
	import mx.collections.ArrayCollection;
	import mx.com.latranquila.model.Person;
	import mx.com.latranquila.web.WebApplication;
	import mx.controls.Alert;
	import mx.rpc.AsyncToken;
	import mx.rpc.Responder;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.remoting.RemoteObject;

	public class Persons extends EventDispatcher	{
		
		protected var _personsRO:RemoteObject;
		protected var _webApplication:WebApplication;
		
		[Bindable]
		public var personsCollection:ArrayCollection;
		
		public function Persons(){
			personsCollection = new ArrayCollection();
		}
		
		public function set webApplication(value:WebApplication):void{
			_webApplication = value;
			_personsRO = _webApplication.getService("persons");
			
			_personsRO.getPersons.addEventListener(ResultEvent.RESULT, getPersonsResult);
			
			_personsRO.getPersons.addEventListener(FaultEvent.FAULT, personsFault);
			_personsRO.getPerson.addEventListener(FaultEvent.FAULT, personsFault);
			_personsRO.newPerson.addEventListener(FaultEvent.FAULT, personsFault);
			_personsRO.updatePerson.addEventListener(FaultEvent.FAULT, personsFault);
			_personsRO.deletePerson.addEventListener(FaultEvent.FAULT, personsFault);
		}
		
		public function getPersons(query:String=null, owners:Boolean=true, notOwners:Boolean=true):void{
			_personsRO.getPersons({query:query, owners:owners, notOwners:notOwners})
	    }
	    
	    public function getPerson(person_id:int, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _personsRO.getPerson({person_id:person_id});
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function newPerson(person:Person, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _personsRO.newPerson({person:person})
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function updatePerson(person:Person, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _personsRO.updatePerson({person:person})
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function deletePerson(person:Person, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _personsRO.deletePerson({person:person})
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    
	    protected function getPersonsResult(event:ResultEvent):void{
			personsCollection.removeAll();
	    	for each(var personObject:Object in event.result){
	    		personsCollection.addItem(new Person(personObject));
	    	}	    	
	    }
	    
	    protected function personsFault(event:FaultEvent):void{
	    	Alert.show("Error:" + event.fault.message, "Persons Error");
	    }
	    
		
	}
}