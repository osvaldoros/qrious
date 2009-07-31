package mx.com.latranquila.AMF{
	
	import flash.events.EventDispatcher;
	import flash.net.NetConnection;
	import flash.net.ObjectEncoding;

	/**
	 * 
	 * @author oros
	 * 
	 */
	public class WebApplication extends EventDispatcher	{
		
		protected var _nc:NetConnection;
		protected var _services:Object;
		protected var _gateway:String;
		protected var _configXML:XMLList;
		
		/**
		 * 
		 * @param configXML
		 * 
		 */
		public function WebApplication(configXML:XMLList){
			_services = new Object();
			NetConnection.defaultObjectEncoding = ObjectEncoding.AMF3; 
			_nc = new NetConnection();
			_configXML = configXML;
			_gateway = _configXML.@gateway;
			connect();
		}
		
		
		/**
		 * 
		 * 
		 */
		public function connect():void{
			_nc.connect(_gateway);
		}
		
		/**
		 * 
		 * 
		 */
		public function disconnect():void{
			_nc.close();
		}
		
		
		/**
		 * 
		 * @param serviceName
		 * @return 
		 * 
		 */
		public function getService(serviceName:String):RemoteObject{
			if(_services.hasOwnProperty(serviceName)){
				return _services[serviceName];
			}else{
				
				var ro:RemoteObject = new RemoteObject();
				var methods:Array = new Array();
				
				var serviceXML:XMLList = _configXML.services.service.(@name == serviceName);
				
				for each(var method:XML in serviceXML.method){
					methods.push(method.@name.toString());
				}
				
				
				ro.configure(serviceName, methods, _nc);
				_services[serviceName] = ro; 
				
				return ro;
			}
		}
		
	}
}