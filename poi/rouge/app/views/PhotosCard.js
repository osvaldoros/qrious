(function() {
	
	var switchToGallery = function(index){
		app.views.viewport.setActiveItem(1);
		var gallery = app.views.viewport.items.map['gallery'];
		gallery.selectImageByIndex(index);
	}
	
	var thumbnails = {
		height:'90%',
		layout:{
			type:'vbox',
		},
		items:[
			{xtype:'spacer'},
			{
				height:80,
				layout:{
					type:'hbox',
					pack:'center',
					itemCls:'thumb'
				},
				items:[
					{width:60, height:60, cls: 'thumb1', listeners:{body:{tap:function(event){ switchToGallery(0)	}}}, id:'thumb1'},
					{width:60, height:60, cls: 'thumb2', listeners:{body:{tap:function(event){ switchToGallery(1)	}}}, id:'thumb2'},
					{width:60, height:60, cls: 'thumb3', listeners:{body:{tap:function(event){ switchToGallery(2)	}}}, id:'thumb3'},
				]
			},
			{
				height:80,
				layout:{
					type:'hbox',
					pack:'center',
					itemCls:'thumb'
				},
				items:[
					{width:60, height:60, cls: 'thumb4', listeners:{body:{tap:function(event){ switchToGallery(3)	}}}, id:'thumb4'},
					{width:60, height:60, cls: 'thumb5', listeners:{body:{tap:function(event){ switchToGallery(4)	}}}, id:'thumb5'},
				]
			},
			{xtype:'spacer'},
		]
	}
	
	app.views.PhotosCard = Ext.extend(Ext.Panel, {
		fullscreen:true,
		title: "Photos",
		iconCls: "photos",
		scroll:'vertical',
		dockedItems:[
			{xtype:'Header', title:'Photos'},
			thumbnails
		]
	});
	
	Ext.reg("PhotosCard", app.views.PhotosCard);

})();
