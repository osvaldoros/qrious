package mx.com.latranquila.AMF{
	
	import flash.events.Event;

	/**
	 * 
	 * @author oros
	 * 
	 */
	public class ResultEvent extends Event{
		
		public static const RESULT:String = "result";
		
		public var result:Object;
		
		/**
		 * 
		 * @param type
		 * @param result
		 * @param bubbles
		 * @param cancelable
		 * 
		 */
		public function ResultEvent(type:String, result:Object, bubbles:Boolean=false, cancelable:Boolean=false){
			super(type, bubbles, cancelable);
			this.result = result;
		}
		
		/**
		 * 
		 * @return 
		 * 
		 */
		override public function clone():Event{
			return new ResultEvent(type, result, bubbles, cancelable);
		}
		
	}
}