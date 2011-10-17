app.views.controls = {};
app.views.controls.Header = Ext.extend(Ext.Panel, {
	style:'background-color:#FEFEFE',
	height:30,
	id:'toolbar',
	items:[
		{
			y:5,
			x:5,
			layout:{
				type:'hbox',
			},
			items:[
				{xtype:'button', text:'home', ui:'small'},
				{xtype:'button', text:this.title, ui:'small'},
				{xtype:'spacer'},
				{width:16, height:16, cls:'poi_visited'},
				{width:16, height:16, cls:'poi_not_visited'},
				{width:16, height:16, cls:'poi_visited'},
				{width:16, height:16, cls:'poi_not_visited'},
				{width:16, height:16, cls:'poi_not_visited'},
				{width:10},
				{html:'75 pts.'},
				{width:10}
			]
		}
	]
});

Ext.reg("Header", app.views.controls.Header);
