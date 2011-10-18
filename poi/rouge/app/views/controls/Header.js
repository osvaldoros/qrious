app.views.controls = {};
app.views.controls.Header = Ext.extend(Ext.Panel, {
	style:'background-color:#AAAAAA',
	height:30,
	id:'toolbar',
	
	initComponent: function() {
        Ext.apply(this, {
			
            items: [
				{
					y:5,
					x:5,
					layout:{
						type:'hbox',
					},
					items:[
						{xtype:'button', text:'Map', ui:'action-small'},
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

        app.views.controls.Header.superclass.initComponent.apply(this, arguments);
    }
	
});


Ext.reg("Header", app.views.controls.Header);
