app.views.Viewport = Ext.extend(Ext.TabPanel, {
	fullscreen: true,
	
	tabBar:{
		dock:'bottom',
		layout:{
			pack:'center'
		}	
	},
	
	items: [
		{xtype:'VideosCard'},
		{xtype:'PhotosCard', id:'photosCard'},
		{xtype:'InfoCard'},
		{xtype:'QuizCard'},
	]
});
