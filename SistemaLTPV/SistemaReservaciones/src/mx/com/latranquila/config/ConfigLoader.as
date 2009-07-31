package mx.com.latranquila.config{
	
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.events.SecurityErrorEvent;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	
	[Event(name="configComplete", type="com.publicis.config.ConfigEvent")]
	[Event(name="configError", type="com.publicis.config.ConfigEvent")]
	/**
	 * 
	 * @author oros
	 * 
	 */
	public class ConfigLoader extends EventDispatcher	{
		
		private var _loader:URLLoader;
		
		public function ConfigLoader()	{
			_loader = new URLLoader();
		}
		
		/**
		 * 
		 * @param path
		 * 
		 */
		public function loadConfig(path:String):void{
			
			var urlReq:URLRequest = new URLRequest(path);
			_loader.addEventListener(Event.COMPLETE, configLoaded);
			_loader.addEventListener(IOErrorEvent.IO_ERROR, configError);
			_loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, configError);
			_loader.load(urlReq);
		}
		
		/**
		 * 
		 * @param event
		 * 
		 */
		protected function configLoaded(event:Event):void{

			var configXML:XML = XML(event.target.data);
			
			for each(var v:XML in configXML.parseVariables){
				
				//Debugger.print("v = "+v.toString());
			}
			
			var e:ConfigEvent = new ConfigEvent(ConfigEvent.CONFIG_COMPLETE, configXML);
			dispatchEvent(e);
		}
		
		/**
		 * 
		 * @param event
		 * 
		 */
		protected function configError(event:Event):void{
			var e:ConfigEvent = new ConfigEvent(ConfigEvent.CONFIG_ERROR);
			dispatchEvent(e);
		}
		
		
		
		
		
	}
}