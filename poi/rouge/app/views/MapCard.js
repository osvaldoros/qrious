app.views.MapCard = Ext.extend(Ext.Panel, {
	title: "Map",
	iconCls: "quiz",
	
	dockedItems:[
		{xtype:'Header', title:'Map'}
	],
	


	items: [
			{
				height:'100%',
				width:'100%',
				cls: 'img mapImage',
			}
	]
	
});

Ext.reg("MapCard", app.views.MapCard);

















