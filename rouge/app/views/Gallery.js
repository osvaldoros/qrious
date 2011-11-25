function buildImage(url, title){
	
	return 	{
		items: [
			{
				title: title,
				cls: 'img ',
				style: "background-image: url('" + url +"');",
				width: '96%',
				height: '96%',
				x:'2%'
			}
		]
	}
}

app.views.Gallery = Ext.extend(Ext.Panel, {
	style:'background-color:#000000;',
	monitorOrientation: true,
	dockedItems:[
		{
			id:'titleBar',
			style:'background-color:#1e2e40;',
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
				{xtype:'spacer'},
				{id:'imgTitle', tpl:'<p style="color:#ffffff;">{title}</p>'},
				{xtype:'spacer'}
			]
		}
	],
	
	initComponent: function() {
		var owner = this;
		Ext.Ajax.request({
		    url: 'json/images.json',
		    success: function(response, opts) {
				owner.addImages(response);
		        owner.setLoading(false);
		    }
		});
		
		this.setLoading(true, true);
		app.views.Gallery.superclass.initComponent.apply(this, arguments);
	},
	
	addImages:function(response){
		var imagesRaw = JSON.parse(response.responseText);
		var imagesArray = imagesRaw.data;
		
		this.images = [];
		for (var i = 0; i < imagesArray.length; i++) {
			var currentImage = imagesArray[i];
			this.images.push(buildImage(currentImage.url, currentImage.title));
		}
		
		this.dataLoaded = true;
		
		if(this.pendingBuild){
			this.buildGallery(this.pendingBuild.width, this.pendingBuild.height, this.pendingBuild.index);
			this.pendingBuild = null;
		}
		
	},
	
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
	
	updateTitle:function(carousel){
		
		if(typeof carousel === 'undefined'){
			carousel = this.getComponent('imageCarousel');
		}
		
		var self = carousel.ownerCt;
		
		index = carousel.getActiveIndex();
		title = carousel.items.items[index].initialConfig.items[0].title;
		//console.log('title = ' + title);
		
		var titleBar = self.getComponent('titleBar');
		var imgTitle;
		if(typeof titleBar !== 'undefined'){
			imgTitle = titleBar.getComponent('imgTitle');
		}
		
		if (typeof imgTitle !== 'undefined') {
			if (typeof title !== 'undefined') {
				imgTitle.update({
					title: title
				});
			}
			else {
				imgTitle.update({
					title: 'untitled'
				});
			}
		}
	},
	
	buildGallery:function(width, height, index){
		if(!this.dataLoaded){
			this.pendingBuild = {
				width:width,
				height:height,
				index:index
			}
			return;
		}
		
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
				items:this.images,
				listeners: {
					cardswitch:this.updateTitle
				}
			}));
			
			
			this.doLayout();
			this.updateTitle();
			this.items.map['imageCarousel'].setActiveItem(index);
		}
	}
	
});

Ext.reg("Gallery", app.views.Gallery);

