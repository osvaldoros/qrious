app.views.Viewport = Ext.extend(Ext.Panel, {
	fullscreen: true,
	layout:"card",
	cardSwitchAnimation:'cube',
	items:[
		new Ext.TabPanel({
			tabBar:{
				dock:'bottom',
				layout:{
					pack:'center'
				}	
			},
			
			items: [
				{xtype:'VideosCard'},
				{xtype:'PhotosCard'},
				{xtype:'InfoCard'},
				{xtype:'QuizCard'},
			]
		}),
		{xtype:"Gallery", id:'gallery'},
		{xtype:"Map", id:'map'}
	]
	

});
