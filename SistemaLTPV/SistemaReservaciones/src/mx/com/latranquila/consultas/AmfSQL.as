package mx.com.latranquila.consultas
{
	import flash.events.EventDispatcher;
	
	import mx.collections.ArrayCollection;
	
	public class AmfSQL extends EventDispatcher
	{
		import mx.com.latranquila.CustomEvent.SqlEvents;
		import mx.com.latranquila.constantes.Globales;
		
		import flash.net.NetConnection;
		import flash.net.ObjectEncoding;
		import flash.net.Responder;
		import flash.events.EventDispatcher;
		import flash.events.Event;

		private var _Globales:Globales = new Globales();
		private var _conn:NetConnection;
		
		
				
		public function AmfSQL(){
		}
		
		public function Conectar():void{
			_conn = new NetConnection();
    		_conn.objectEncoding = ObjectEncoding.AMF3;
    		_conn.connect(_Globales._gateWay);
		}
		
		public function AMFService(_servicio:String,_parametros:*):void{
			Conectar();
            _conn.call(_servicio, new Responder(onResult, onFault), _parametros);
		}
		
		public function onResult(evento:Object):void{
			var respuesta:ArrayCollection = new ArrayCollection();
			if(evento is String||evento is Boolean||evento is Number){
				dispatchEvent(new SqlEvents(SqlEvents.QUERY_LISTO,evento,evento.toString(),false));
			}else{		
				dispatchEvent(new SqlEvents(SqlEvents.QUERY_LISTO,evento,"",true));
			}
			Desconectar();
		}
				
				
		public function onFault(evento:Object):void{
			if(evento is String){
				dispatchEvent(new SqlEvents(SqlEvents.QUERY_ERROR,"",evento.toString(),false));
			}else{
				dispatchEvent(new SqlEvents(SqlEvents.QUERY_ERROR,"","No se puede describir el error",false));
			}
			Desconectar();
		}
		
		public function Desconectar():void{
			_conn.close();
		}
	}
}