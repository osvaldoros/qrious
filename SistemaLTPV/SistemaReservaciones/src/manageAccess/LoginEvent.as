package manageAccess {
	
	import flash.events.Event;
	
	public class LoginEvent extends Event{

		public static const LOGIN_COMPLETE_EVENT:String = "loginComplete";
		
		public var state:String;
		public var stateParams:Object
		
		function LoginEvent(state:String, stateParams:Object=null) {
			super(LOGIN_COMPLETE_EVENT);
			this.state = state;
			this.stateParams = stateParams;
		}
		
		override public function clone():Event {
			return new LoginEvent(state, stateParams);
		}
		
	}
}

