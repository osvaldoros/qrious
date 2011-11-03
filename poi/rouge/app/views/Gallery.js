function buildImage(name){
	return 	{
		items: [
			{
				cls: 'img ' + name,
				width: '96%',
				height: '96%',
				x:'2%'
			}
		]
	}
}

var images = [ 
	buildImage('img1'),
	buildImage('img2'),
	buildImage('img3'),
	buildImage('img4'),
	buildImage('img5')
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
	
	
	afterRender:function(){
		app.views.Gallery.superclass.afterRender.call(this);
		
		// monitor pinch events
		this.mon(this.el, {
            pinch: this.handlePinch,
            pinchstart: this.handlePinch,
            pinchend: this.handlePinch,
			scope: this
		});
    },
	
	// TODO, zoom the image according to the distance in the pinch using the css scale properties
	handlePinch: function(e) {
        console.log(e);
    },
	
	selectImageByIndex:function(index){
		this.buildGallery(Ext.Element.getViewportWidth(), Ext.Element.getViewportHeight(), index)
	},
	
	onOrientationChange:function(orientation, width, height){
		this.buildGallery(width, height)
	},
	
	buildGallery:function(width, height, index){
		if(!this.hidden){
			
			var oldCarousel = this.getComponent('imageCarousel');
			if (typeof(oldCarousel) !== 'undefined') {
				if(typeof(index) === 'undefined'){
					index = oldCarousel.getActiveIndex();
				}
				this.remove('imageCarousel');
			}
			
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

