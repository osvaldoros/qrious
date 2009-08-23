package manageAccess{
	import com.verxite.web.WebApplication;
	import mx.rpc.events.FaultEvent;
	import flash.events.Event;
	
	public interface ILoginModule{
		
		
		function set webApplication(webApplication:WebApplication):void;
		function loginRequest(userName:String, password:String):void
		function close():void;
		//function handleLoginResult(loginResult:Event):void;
		//function handleLoginFault(loginFault:FaultEvent):void;
	}
}