package mx.com.latranquila.CustomEvent
{
	import flash.events.Event;
	
	public class SqlEvents extends Event{	
			
		public static const QUERY_LISTO:String = "query_listo";
		public static const QUERY_ERROR:String = "query_error";
		public static const CONN_LISTA:String = "conn_lista";
		public static const CONN_ERROR:String = "conn_error";
		
 		public var _data:*;
 		public var _error:String = "";
 		public var _isData:Boolean = false;
 			
		public function SqlEvents(type:String,data:*,error:String,isData:Boolean){			
			this._data 			= data;
			this._error 		= error;
			this._isData 		= isData;
			super(type,true,false)
		}
	}
}