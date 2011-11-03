(function() {
	
	var switchToGallery = function(index){
		app.views.viewport.setActiveItem(1);
		var gallery = app.views.viewport.items.map['gallery'];
		gallery.selectImageByIndex(index);
	}
	
	var thumbnails = {
		layout:{
			type:'vbox',
			pack:'center',
		},
		items:[
			{
				height:20,
			},
			{
				height:80,
				layout:{
					type:'hbox',
					pack:'center',
					itemCls:'thumb'
				},
				items:[
					{width:40, height:40, cls: 'thumb1', listeners:{body:{tap:function(event){ switchToGallery(0)	}}}, id:'thumb1'},
					{width:40, height:40, cls: 'thumb2', listeners:{body:{tap:function(event){ switchToGallery(1)	}}}, id:'thumb2'},
					{width:40, height:40, cls: 'thumb3', listeners:{body:{tap:function(event){ switchToGallery(2)	}}}, id:'thumb3'},
					{width:40, height:40, cls: 'thumb4', listeners:{body:{tap:function(event){ switchToGallery(3)	}}}, id:'thumb4'},
					{width:40, height:40, cls: 'thumb5', listeners:{body:{tap:function(event){ switchToGallery(4)	}}}, id:'thumb5'},
				]
			}
		]
	}
	
	app.views.PhotosCard = Ext.extend(Ext.Panel, {
		fullscreen:true,
		title: "Photos",
		iconCls: "photos",
		scroll:'vertical',
		dockedItems:[
			{xtype:'Header', title:'Photos'}
		],
		items:[
			thumbnails
		],
	});
	
	Ext.reg("PhotosCard", app.views.PhotosCard);

})();
