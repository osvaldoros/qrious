package mx.com.latranquila.controller{
	
	import flash.events.EventDispatcher;
	
	import mx.collections.ArrayCollection;
	import mx.com.latranquila.model.Unit;
	import mx.com.latranquila.web.WebApplication;
	import mx.controls.Alert;
	import mx.rpc.AsyncToken;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.remoting.RemoteObject;

	public class Units extends EventDispatcher	{
		
		protected var _unitsRO:RemoteObject;
		protected var _webApplication:WebApplication;
		
		[Bindable]
		public var unitCollection:ArrayCollection;
		
		public function Units(){
			unitCollection = new ArrayCollection();
		}
		
		public function set webApplication(value:WebApplication):void{
			_webApplication = value;
			_unitsRO = _webApplication.getService("units");
			
			_unitsRO.getUnits.addEventListener(ResultEvent.RESULT, getUnitsResult);
			
			_unitsRO.getUnits.addEventListener(FaultEvent.FAULT, unitsFault);
			_unitsRO.getAvailability.addEventListener(FaultEvent.FAULT, unitsFault);
			_unitsRO.getUnit.addEventListener(FaultEvent.FAULT, unitsFault);
			_unitsRO.newUnit.addEventListener(FaultEvent.FAULT, unitsFault);
			_unitsRO.updateUnit.addEventListener(FaultEvent.FAULT, unitsFault);
			_unitsRO.deleteUnit.addEventListener(FaultEvent.FAULT, unitsFault);
		}
		
		public function getUnits(unitType:String=null):void{
			_unitsRO.getUnits({unit_type:unitType});
	    }
	    
	    public function getAvailability(unitId:int):void{
	    	_unitsRO.getAvailability({unit_id:unitId})
	    }
	    
	    public function getUnit(unitId:int, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _unitsRO.getUnit({unit_id:unitId})
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function newUnit(unit:Unit, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _unitsRO.newUnit({unit:unit})
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function updateUnit(unit:Unit, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _unitsRO.updateUnit({unit:unit})
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }
	    
	    public function deleteUnit(unit:Unit, resultHandler:Function=null, faultHandler:Function=null):void{
	    	var token:AsyncToken = _unitsRO.deleteUnit({unit:unit})
	    	token.addResponder(new mx.rpc.Responder(resultHandler, faultHandler));
	    }		
	    
	    protected function getUnitsResult(event:ResultEvent):void{
	    	unitCollection.removeAll();
	    	for each(var unitObject:Object in event.result){
	    		unitCollection.addItem(new Unit(unitObject));
	    	}
	    }
	    
	    protected function unitsFault(event:FaultEvent):void{
	    	Alert.show("Error:" + event.fault.message, "Units Error");
	    }
		
		
	}
}