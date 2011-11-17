app.views.MapCard = Ext.extend(Ext.Panel, {
	title: "Map",
	iconCls: "map",
	
	dockedItems:[
		{xtype:'Header', title:'Map'}
	],
	
	items: [
			{
				height:'100%',
				width:'100%',
				id:'mapPanel',
				cls: 'img mapImage',
			}
	],
	
	initComponent: function() {
		var owner = this;
		Ext.Ajax.request({
		    url: 'assets/map.json',
		    success: function(response, opts) {
				owner.addMap(response);
		        owner.setLoading(false);
		    }
		});
		
		this.setLoading(true, true);
		app.views.MapCard.superclass.initComponent.apply(this, arguments);
	},
	
	
	addMap: function(response){
		var mapRaw = JSON.parse(response.responseText);
		var mapArray = mapRaw.data;
		
		var firstMap = mapArray[0];
		
		var mapPanel = this.getComponent('mapPanel');
		this.remove(mapPanel);
		
		this.add({
			height:'100%',
			width:'100%',
			id: 'mapPanel',
			cls: 'img',
			style: "background-image: url('" + firstMap.url + "');"
		});
		
		this.doLayout();
	}
	
});

Ext.reg("MapCard", app.views.MapCard);

















