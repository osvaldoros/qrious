package mx.com.latranquila.AMF{
	
	import flash.events.EventDispatcher;
	import flash.net.NetConnection;
	import flash.utils.Proxy;
	import flash.utils.flash_proxy;

	/**
	 * 
	 * @author oros
	 * 
	 */
	dynamic public class RemoteObject extends Proxy{
		
		
		
		public var name:String;
		
		protected var _nc:NetConnection; 
		protected var _methods:Object;
		protected var _eventDispatcher:EventDispatcher;
		
		
		/**
		 * 
		 * 
		 */
		public function RemoteObject()	{
			//_eventDispatcher = new EventDispatcher(this);
		}
		
		/**
		 * 
		 * @param serviceName
		 * @param methods
		 * @param nc
		 * 
		 */
		internal function configure(serviceName:String, methods:Array, nc:NetConnection):void{
			this.name = serviceName;
			_nc = nc;
			_methods = new Object();
			for each(var name:String in methods){
				var rm:RemoteMethod = new RemoteMethod();
				rm.configure(name, this, _nc);
				 _methods[name] = rm;
			}
		}
		
		
		//=========================================
		//
		//  Proxy
		//
		//==========================================
		
		/**
		 * 
		 * @param methodName
		 * @param args
		 * @return 
		 * 
		 */
		flash_proxy override function callProperty(methodName:*, ...args):*{
			
			// if the method is found in this class call it
			/*if(this.hasOwnProperty(methodName)){
				return this[methodName].apply(this, args);
			}*/
			
			//  if the method is one of the RemoteMethods then call it via the netConnection
			if(_methods.hasOwnProperty(methodName)){
				var params:Object = args[0]
				_methods[methodName].call(params);
			}
			
		}
		
		/**
		 * 
		 * @param name
		 * @return 
		 * 
		 */
		flash_proxy override function getProperty(name:*):* {
			// if the property is found in this class return it
			/*if(this.hasOwnProperty(name)){
				return this[name];
			}*/
			
			//  if the property matches one of the methods return it, this way we can addListeners to it etc...
			if(_methods.hasOwnProperty(name)){
				return _methods[name];
			}	
		}
		
		
		//=========================================
		//
		//  RemoteObject
		//
		//==========================================
		
		
		/**
		 * 
		 * @param name
		 * @param args
		 * 
		 */
		public function call(name:String, ...args):void{
			_methods[name].call(args);
		}
		
	}
}