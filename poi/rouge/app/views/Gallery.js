
var images = [
	{ cls: 'img img1'},
	{ cls: 'img img2'},
	{ cls: 'img img3'},
	{ cls: 'img img4'},
	{ cls: 'img img5'},
	{ cls: 'img img6'}
];

app.views.Gallery = Ext.extend(Ext.Panel, {
	style:'background-color:#000000;',
	monitorOrientation: true,
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
						items:images
					})
				],
        });
		

        app.views.Gallery.superclass.initComponent.apply(this, arguments);
    },
	
	selectImageByIndex:function(index){
		this.buildGallery(Ext.Element.getViewportWidth(), Ext.Element.getViewportHeight(), index)
	},
	
	onOrientationChange:function(orientation, width, height){
		this.buildGallery(width, height)
	},
	
	buildGallery:function(width, height, index){
		if(!this.hidden){
			
			if(typeof(index) === 'undefined'){
				var oldCarousel = this.getComponent('imageCarousel');
				index = oldCarousel.getActiveIndex();
			}
			
			this.remove('imageCarousel');
			this.add(new Ext.Carousel({
				id:'imageCarousel',
				width: width,
				height:height,
				items:images
			}));
			this.doLayout();
			this.items.map['imageCarousel'].setActiveItem(index);
		}
	}
	
});

Ext.reg("Gallery", app.views.Gallery);

