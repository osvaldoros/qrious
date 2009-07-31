package mx.com.latranquila.AMF{
	
	
	import flash.events.EventDispatcher;
	import flash.net.NetConnection;
	import flash.net.Responder;
	
	[Event(name="result", type="cerberus.flash.AMF.ResultEvent")]
	[Event(name="fault", type="cerberus.flash.AMF.FaultEvent")]
	/**
	 * 
	 * @author oros
	 * 
	 */
	internal class RemoteMethod extends EventDispatcher implements IRemoteMethod{
		
		public var name:String;
		
		protected var _nc:NetConnection;
		protected var _ro:RemoteObject;
		protected var _rsp:Responder;
		
		/**
		 * 
		 * 
		 */
		public function RemoteMethod()	{
			_rsp = new Responder( doResult, doFault );
		}
		
		/**
		 * 
		 * @param parameters
		 * 
		 */
		public function call(parameters:Object):void{
			_nc.call(_ro.name + "." + name, _rsp, parameters);
		}
		
		/**
		 * 
		 * @param name
		 * @param remoteObject
		 * @param nc
		 * 
		 */
		internal function configure(name:String, remoteObject:RemoteObject, nc:NetConnection):void{
			this.name = name;
			_ro = remoteObject;
			_nc = nc;
		}
		
		
		
		/**
		 * 
		 * @param result
		 * 
		 */
		protected function doResult( result:Object ):void{
			
			//trace( "Result: " + result.toString() );
			dispatchEvent(new ResultEvent(ResultEvent.RESULT, result));
		}
		
		/**
		 * 
		 * @param fault
		 * 
		 */
		protected function doFault( fault:Object ):void{
			//trace( "Status: " + status.toString() );
			dispatchEvent(new FaultEvent(FaultEvent.FAULT, fault));
		}		
		
	}
}