package mx.com.latranquila.controller{
	
	import flash.events.EventDispatcher;
	
	import mx.com.latranquila.model.Unit;
	import mx.com.latranquila.web.WebApplication;
	import mx.rpc.remoting.RemoteObject;

	public class Units extends EventDispatcher	{
		
		protected var _unitsRO:RemoteObject;
		protected var _webApplication:WebApplication;
		
		public function Units(){
			
		}
		
		public function set webApplication(value:WebApplication):void{
			_webApplication = value;
			_unitsRO = _webApplication.getService("Units");
			
		}
		
		public function getUnits(unitType:String=null):void{
			_unitsRO.getUnits({unit_type:unitType});
	    }
	    
	    public function getAvailability(unitId:int):void{
	    	_unitsRO.getAvailability({unit_id:unitId})
	    }
	    
	    public function getUnit(unitId:int):void{
	    	_unitsRO.getUnit({unit_id:unitId})
	    }
	    
	    public function newUnit(unit:Unit):void{
	    	_unitsRO.newUnit({unit:unit})
	    }
	    
	    public function updateUnit(unit:Unit):void{
	    	_unitsRO.updateUnit({unit:unit})
	    }
	    
	    public function deleteUnit(unit:Unit):void{
	    	_unitsRO.deleteUnit({unit:unit})
	    }		
		
		
	}
}