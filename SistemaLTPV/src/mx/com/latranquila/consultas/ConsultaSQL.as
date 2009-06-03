package mx.com.latranquila.consultas
{
	import flash.events.EventDispatcher;
	
	import mx.collections.ArrayCollection;
	
	public class ConsultaSQL extends EventDispatcher
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
		private var _action:Number = new Number();
		private var _servicio:String = new String();
				
		public function ConsultaSQL(_serv:String){
			_servicio = _serv;
		}
		
		public function Conectar():void{
			_conn = new NetConnection();
    		_conn.objectEncoding = ObjectEncoding.AMF3;
    		_conn.connect(_Globales._gateWay);
		}
		
		public function Sql(_sql:String):void{
			Conectar();
            _conn.call(_servicio, new Responder(onResult, onFault), _sql);
		}
		
		public function onResult(evento:Object):void{
			var respuesta:ArrayCollection = new ArrayCollection();
			if(evento is String){
				dispatchEvent(new SqlEvents("query_listo",evento,evento.toString(),false));
			}else{
				var x:int;
				var y:int;
				var temp:ArrayCollection;
				var vartag:String;
				var obj_a:Object;
				
				temp = new ArrayCollection;
				var arrays:Array = evento.serverInfo.initialData;
				var labels:Array = evento.serverInfo.columnNames;
				for(y=0;y<arrays.length;y++){
					obj_a = new Object()
					for(x=0;x<labels.length;x++){
						obj_a[labels[x]] = arrays[y][x];
						}
					respuesta.addItem(obj_a); 	
				}
				
				dispatchEvent(new SqlEvents("query_listo",respuesta,"",true));
			}
			Desconectar();
		}
				
				
		public function onFault(evento:Object):void{
			if(evento is String){
				dispatchEvent(new SqlEvents("query_error","",evento.toString(),false));
			}else{
				dispatchEvent(new SqlEvents("query_error","","No se puede describir el error",false));
			}
			Desconectar();
		}
		
		public function Desconectar():void{
			_conn.close();
		}
	}
}