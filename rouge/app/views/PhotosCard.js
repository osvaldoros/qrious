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
		id:'thumbnails'
	}
	
	app.views.PhotosCard = Ext.extend(Ext.Panel, {
		fullscreen:true,
		title: "Photos",
		iconCls: "photos",
		scroll:'vertical',
		dockedItems:[
			{xtype:'Header', title:'Photos'},
			thumbnails
		],
		
		initComponent: function() {
			
			var owner = this;
			Ext.Ajax.request({
			    url: 'json/thumbs.json',
			    success: function(response, opts) {
					owner.addThumbs(response);
			        owner.setLoading(false);
			    }
			});
			
			this.setLoading(true, true);
			app.views.PhotosCard.superclass.initComponent.apply(this, arguments);
		},
		
		// JSON callback
		addThumbs: function(response){
			var thumbs = JSON.parse(response.responseText);
			var thumbsArray = thumbs.data;
			
			var thumbsPanel = this.getComponent('thumbnails');
			var oldComponents = thumbsPanel.items.keys;
			
			// remove all the current elements from the thumbs container
			for (var o = 0; o < oldComponents.length; o++) {
				thumbsPanel.remove(oldComponents[o]);
			}
			
			// add a spacer at the top
			thumbsPanel.add({xtype:'spacer'})
			
			// add hboxes each containing a maximum of 3 items
			var hboxCounter = 0;
			var currentItems = [];
			for (var i=0; i < thumbsArray.length; i++){
				var currentThumb = thumbsArray[i];
				
				
				// add an item to the current hbox
				var item = {width:60, height:60, style: "background-image: url('" + currentThumb.url +"');", id:'thumb' + i};
				item.listeners = {
					body:{
						tap:function(event, el, obj){ switchToGallery(obj.getIndex())},
						//*** we needed a way for the obj to remember which index it is,
						// because of the way closures work, passing i directly in switchToGallery would mean getting the last value of i in the loop
						// instead we need to localize i by passing it as an argument to a self executing function, that redefines itself to return the correct value ***
						getIndex:function(newIndex){return function(){return newIndex} }(i)
					}
				}
				currentItems.push(item);
				hboxCounter++;
				
				// if the hbox is full or we are at the end of the data add the box to the container
				if (hboxCounter > 2 || i == (thumbsArray.length - 1)) {
					var hbox = {
						height:80,
						layout:{
							type:'hbox',
							pack:'center',
							itemCls:'thumb'
						},
						items:currentItems.concat() // make a copy of the array
					}
					
					thumbsPanel.add(hbox)
					currentItems = []			
					hboxCounter = 0;
				}
			}
			
			// add a spacer at the bottom
			thumbsPanel.add({xtype:'spacer'})
			thumbsPanel.doLayout()
		}
			
	});
	
	Ext.reg("PhotosCard", app.views.PhotosCard);

})();
