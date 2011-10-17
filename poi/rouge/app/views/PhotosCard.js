(function() {
	
	var gallery = new Ext.Carousel({
		fullscreen:true,
		items:[
				{cls: 'img img1'},
				{cls: 'img img2'},
				{cls: 'img img3'},
				{cls: 'img img4'},
				{cls: 'img img5'},
				{cls: 'img img6'}
		]
	});
	
	var listeners = {
		body:
		{
			tap:function(){
				var photos = app.views.viewport.items.map['photosCard'];
				var toolbar = photos.dockedItems.map['toolbar'];
				photos.setActiveItem(1);
				var backButton = new Ext.Button({
                    ui  : 'back',
                    text: 'back'
                });
				
				backButton.handler = function(){
					photos.setActiveItem(0);
					toolbar.remove(backButton);
				}
				toolbar.add(backButton);
				toolbar.doLayout();
			}
		}, scope:this
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
					{width:40, height:40, cls: 'thumb1', listeners:listeners},
					{width:40, height:40, cls: 'thumb2', listeners:listeners},
					{width:40, height:40, cls: 'thumb3', listeners:listeners},
					{width:40, height:40, cls: 'thumb4', listeners:listeners},
					{width:40, height:40, cls: 'thumb5', listeners:listeners},
					{width:40, height:40, cls: 'thumb6', listeners:listeners}
				]
			}
		]
	}
	
	
	app.views.PhotosCard = Ext.extend(Ext.Panel, {
		title: "Photos",
		iconCls: "photos",
		scroll:'vertical',
		dockedItems:[
			{xtype:'Header', title:'Photos'}
		],
		layout:'card',
		items:[
			thumbnails, gallery
		],
	});
	
	Ext.reg("PhotosCard", app.views.PhotosCard);

})();
