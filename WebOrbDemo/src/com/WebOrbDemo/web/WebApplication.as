package com.WebOrbDemo.web{
	
	import com.WebOrbDemo.auth.User;
	import com.WebOrbDemo.events.LogoutEvent;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.system.Capabilities;
	
	import mx.messaging.ChannelSet;
	import mx.messaging.channels.AMFChannel;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.remoting.RemoteObject;
	
	public class WebApplication extends EventDispatcher {
		
		private var _configXML:XMLList;
		private var _protocol:String;
		private var _uploadProtocol:String;
		private var _uploadPort:String;
		private var _amfChannelSet:ChannelSet;
		private var _auth:RemoteObject;
		private var _user:User;
		private var _ticketProcess:RemoteObject;

		private var _services:Object = {};
		private var _userName:String = "";
		private var _password:String = "";
		private var _hostName:String;
		private var _ticket:String;

		private var _loginType:String;
		private var _channelId:String;
		private var _destination:String;

		[Event(name="logoutComplete", type="com.WebOrbDemo.events.LogoutEvent")]
		public function WebApplication(configXML:XMLList) {
			super();

			_configXML = configXML;
			_hostName = _configXML.webHost.@name;
			
			_channelId = _configXML.@channelId.toString();
			_destination = _configXML.@destination.toString()
			
			var version:String = Capabilities.version;
			if(true/*_hostName == "localhost" || _hostName == "192.168.0.101"*/) {
				_protocol = "http";
				_uploadProtocol = "http";
				_uploadPort = "80";				
			} else if  ( version.indexOf("WIN") != -1 || version.indexOf("MAC") != -1 ) {
				_protocol = "https";
				_uploadProtocol = "https";
				_uploadPort = "443";
			} else {
				_protocol = "https";
				_uploadProtocol = "http";
				_uploadPort = "80";
			}

			
			var amfChannel:AMFChannel = new AMFChannel(_channelId, _configXML.@gateway); // MUST be called "my-cfamf" as in wwwroot/WEB-INF/flex/services-config.xml
			_amfChannelSet = new ChannelSet();
			_amfChannelSet.addChannel(amfChannel);
			
			_auth = getService("userAuth");
			if(_auth){
				_auth.silentLogout.addEventListener(mx.rpc.events.FaultEvent.FAULT,   handleSilentLogout);
				_auth.silentLogout.addEventListener(mx.rpc.events.ResultEvent.RESULT, handleSilentLogout);
				_auth.appLogout.addEventListener(mx.rpc.events.FaultEvent.FAULT,   handleLogout);
				_auth.appLogout.addEventListener(mx.rpc.events.ResultEvent.RESULT, handleLogout);
				_auth.login.addEventListener(mx.rpc.events.FaultEvent.FAULT,   loginFault);
				_auth.login.addEventListener(mx.rpc.events.ResultEvent.RESULT, loginResult);
			}
			
		}
			
		// This is speculative. Do we even need it?
		public function getService(name:String):RemoteObject {
			
			var service:RemoteObject = _services[name];
			if (service) {	
				return service; // It was in cache so just return it.
			}
			
			// Is the service name in the configXML? 
			var serviceDefinition:XMLList = _configXML.services.service.(@name == name);
			
			if (! serviceDefinition.hasComplexContent()) {
				// The service is not defined in the configXML!!
				return null;
			}
			
			// Create the service and tie it to the amf channel set.
			service = new RemoteObject();
			service.destination = _destination;             // Must be "ColdFusion" and watch capitalization! as in wwwroot/WEB-INF/flex/services-config.xml
			service.source = serviceDefinition.@source;       //"Octopz_v1.flashRemote.user.auth";			
			service.channelSet = _amfChannelSet;
			
			// Keep track of the service by name in the _services object.
			_services[name] = service;
			service.setRemoteCredentials(_userName, _password); // Must be setRemoteCredentials and NOT setCredentials..
			return service;
		}	
		
		public function get user():User{
			return _user;
		}
		
		
		public function logout():void{
			_auth.appLogout();
			
			//_auth.logout(); // DO NOT CALL logout(). CAUSES BIG PROBLEMS!!!
		}



		/**
		 * Result handler for silentLogout process. silentLogout is called before any type of login to make sure that there
		 * is no conflicting sessions on the coldfusion server. Based on the _loginType set by each login function, calls the appropriate
		 * login service.
		 * 
		 * @param e
		 * 
		 */
		private function handleSilentLogout(e:Object):void {
			var service:RemoteObject;
			var p:String
			
			// Set the new Remote Credentials on all the services before logging in.
			
			/*for (p in _services) {
				service = _services[p] as RemoteObject;
				service.setRemoteCredentials(_userName, _password);
			}	*/			
			
			_auth.login({username:_userName, password:_password});
		}
		
		private function handleLogout(e:Object):void{
			dispatchEvent(new LogoutEvent(LogoutEvent.LOGOUT_COMPLETE));
		}
	
		/**
		 * Handles 'regular' username/password type logins.
		 * 
		 * @param userName
		 * @param password
		 * 
		 */
		public function login(userName: String, password:String):void {
			trace("attempting login");
			_userName = userName;
			_password = password;
			_auth.silentLogout();
		}	
			
		
		private function loginFault(fault:FaultEvent):void{
			dispatchEvent( fault );
		}
		
		private function loginResult(event:ResultEvent):void{
			_user = new User(event.result.user);
			dispatchEvent( new Event("loginResult") );
		}
	
		/**
		 * Returns upload protocol, ie, http or https. Used to upload files
		 * 
		 * @return upload protocol
		 */		
		public function get uploadProtocol():String {
			return _uploadProtocol;
		}
		
		/**
		 * Returns protocol, ie, http or https. Used to load content among other things
		 * 
		 * @return protocol
		 */		
		public function get protocol():String {
			return _protocol;
		}
		
		/**
		 * Returns upload port, ie 80 or 443
		 * @return upload port
		 * 
		 */
		public function get uploadPort():String {
			return _uploadPort;
		}
		
		/**
		 * Returns hostname of the server.
		 * @return hostname
		 * 
		 */
		public function get hostName():String {
			return _hostName;
		}
		
	}
}