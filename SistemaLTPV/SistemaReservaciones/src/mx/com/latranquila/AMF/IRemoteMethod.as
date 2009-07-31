package mx.com.latranquila.AMF{

	import flash.events.IEventDispatcher;
	
	[Event(name="result", type="cerberus.flash.AMF.ResultEvent")]
	[Event(name="fault", type="cerberus.flash.AMF.FaultEvent")]
	/**
	 * 
	 * @author oros
	 * 
	 */
	public interface IRemoteMethod extends IEventDispatcher	{
		/**
		 * 
		 * @param parameters
		 * 
		 */
		function call(parameters:Object):void;
	}
}