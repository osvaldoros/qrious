package mx.com.latranquila.conexiones
{
	import flash.events.EventDispatcher;
	
	public class ConexionAMF extends EventDispatcher
	{
		import mx.com.latranquila.Eventos.SqlEvents;
		import mx.com.latranquila.constantes.Globales;
		import flash.net.NetConnection;
		import flash.net.ObjectEncoding;
		import flash.net.Responder;
		import flash.events.EventDispatcher;
		import flash.events.Event;

		private var _Globales:Globales = new Globales();
		private var _conn:NetConnection;
		
		public function ConexionAMF(){
		}
		
		public function Conectar():void{
			_conn = new NetConnection();
    		_conn.objectEncoding = ObjectEncoding.AMF3;
    		_conn.connect(_Globales._gateWay);
		}
		
		public function Servicio(_sql:String,_servicio:String,_accion:Number):void{
			Conectar();
			var _Parametros:Object = {_sql:_sql,_bdd:_Globales._bdd,_accion:_accion};
            _conn.call(_servicio, new Responder(onResult, onFault), _Parametros);
		}
		
		public function onResult(e:Object):void{
			dispatchEvent(new SqlEvents("conn_lista"));
		}
		
		public function onFault(e:Object):void{
			dispatchEvent(new SqlEvents("conn_error"));
		}
		
		public function Desconectar():void{
			_conn.close();
		}
	}
}