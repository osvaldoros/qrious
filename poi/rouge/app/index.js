app = new Ext.Application({
	name: "app",
	launch: function(){
		this.views.viewport = new this.views.Viewport();
	}
});
