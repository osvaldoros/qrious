app.views.Gallery = Ext.extend(Ext.Panel, {
	style:'background-color:#000000;',
	
	dockedItems:[
		{
			style:'background-color:#AAAAAA;',
			layout:'hbox',
			height:30,
			items:[
				{
					x:5,
					xtype:'button', 
					ui:'action-small',
					text:'back', 
					handler: function(){
						app.views.viewport.setActiveItem(0, {type:'cube', direction:'right'});
					}
				},
			]
		}
	],
	
	initComponent: function() {
        Ext.apply(this, {
			
			items:[
				new Ext.Carousel({
					id:'imageCarousel',
					width: '100%',
					height:'100%',
					items:[
							{ cls: 'img img1'},
							{ cls: 'img img2'},
							{ cls: 'img img3'},
							{ cls: 'img img4'},
							{ cls: 'img img5'},
							{ cls: 'img img6'}
						]
					}),
					{
						xtype:'button', 
						text:'back', 
						handler: function(){
							app.views.viewport.setActiveItem(0);
						}
					},
				],
        });
		

        app.views.Gallery.superclass.initComponent.apply(this, arguments);
    },
	
	selectImageByIndex:function(index){
		console.log('selectImageByIndex');
		this.items.map['imageCarousel'].setActiveItem(index);
	}
});

Ext.reg("Gallery", app.views.Gallery);

