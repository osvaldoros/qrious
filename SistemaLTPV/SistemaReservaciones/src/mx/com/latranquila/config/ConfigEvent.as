package mx.com.latranquila.config{
	
	import flash.events.Event;

	/**
	 * 
	 * @author oros
	 * 
	 */
	public class ConfigEvent extends Event	{
		
		public static const CONFIG_COMPLETE:String = "configComplete";
		public static const CONFIG_ERROR:String = "configError";
		
		public var configXML:XML;
		
		/**
		 * 
		 * @param type
		 * @param configXML
		 * @param bubbles
		 * @param cancelable
		 * 
		 */
		public function ConfigEvent(type:String, configXML:XML=null, bubbles:Boolean=false, cancelable:Boolean=false)	{
			
			super(type, bubbles, cancelable);
			
			this.configXML = configXML;
			
		}
		
		/**
		 * 
		 * @return 
		 * 
		 */
		override public function clone():Event{
			return new ConfigEvent(type, configXML, bubbles, cancelable);
		}
		
	}
}