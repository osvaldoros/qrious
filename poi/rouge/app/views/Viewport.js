app.views.Viewport = Ext.extend(Ext.Panel, {
	fullscreen: true,
	layout:"card",
	cardSwitchAnimation:'cube',
	items:[
		new Ext.TabPanel({
			id:'mainTabs',
			activeItem:1,
			tabBar:{
				dock:'bottom',
				layout:{
					pack:'center'
				}	
			},
			
			items: [
				{xtype:'MapCard'},
				{xtype:'VideosCard'},
				{xtype:'PhotosCard'},
				{xtype:'InfoCard'},
				{xtype:'QuizCard'},
			]
		}),
		{xtype:"Gallery", id:'gallery'},
		// {xtype:"Map", id:'map'}
	]
	/*
	,
	afterRender:function(){
		console.log('afterRender')
		var mainTabs = this.getComponent('mainTabs');
		console.log(mainTabs)
		mainTabs.setActiveItem(1);
	}
	*/

});
