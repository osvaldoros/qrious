package mx.com.latranquila..CustomEvent
{
	import flash.events.Event;

	public class ConnEvents extends Event
	{
		public static const CONN_LISTA:String = "conn_lista";
		public static const CONN_ERROR:String = "CONN_error";
		
		public var _data:*;
 		public var _error:String = "";
 		public var _isData:Boolean = false;;
		public var _lastRecord:Number = 0;
		
		public function ConnEvents(type:String){
			this._error 		= _error;
			this._isData 		= _isData;
			this._data 			= _data;
			this._lastRecord 	= _lastRecord;
			super(type, true, false);
		}
		
	}
}