package mx.com.latranquila.AMF{
	import flash.events.Event;

	/**
	 * 
	 * @author oros
	 * 
	 */
	public class FaultEvent extends Event	{
		
		public static const FAULT:String = "fault";
		
		public var fault:Object;		
		
		/**
		 * 
		 * @param type
		 * @param fault
		 * @param bubbles
		 * @param cancelable
		 * 
		 */
		public function FaultEvent(type:String, fault:Object, bubbles:Boolean=false, cancelable:Boolean=false){
			super(type, bubbles, cancelable);
			this.fault = fault;
		}
		
		/**
		 * 
		 * @return 
		 * 
		 */
		override public function clone():Event{
			return new FaultEvent(type, fault, bubbles, cancelable);
		}
		
	}
}