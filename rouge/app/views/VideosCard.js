
var vidTmp = new Ext.XTemplate(
		'<tpl for=".">',
		'<video id="video{id}" width="300" height="150" poster="{poster}" >',
		'<source src="{url}">',
		'</video>',
		'</tpl>');
				

app.views.VideosCard = Ext.extend(Ext.Panel, {
	title: "Videos",
	iconCls: "videos",
	scroll:'vertical',
	dockedItems:[
		{xtype:'Header', title:'Video'},
	],
	
	layout:{
		type:'vbox',
		pack:'center',
	},
	
	initComponent: function() {
        Ext.apply(this, {
			items:[
				{xtype:'spacer'},
				{
					id:'videoPanel', 
					tpl:vidTmp,
					width: 300,
		   			height: 150,
					listeners : {
						body:{
							tap: function (view, index, el, e) {
								var videoElem = document.getElementById('video1');
								videoElem.play();
							}
						}
					},
				},
				{xtype:'spacer'},
			]
		})
		
		var owner = this;
		Ext.Ajax.request({
		    url: 'json/videos.json',
		    success: function(response, opts) {
				owner.addVideoPanel(response);
		        owner.setLoading(false);
		    }
		});
		
		this.setLoading(true, true);
	
		app.views.VideosCard.superclass.initComponent.apply(this, arguments);
		
	},
	
	addVideoPanel: function(response){
		var videos = JSON.parse(response.responseText);
		
		var firstVideo = videos.data[0];
		
		var videoPanel = this.getComponent('videoPanel');
		if (typeof(videoPanel) !== 'undefined') {
			videoPanel.update(firstVideo);
		}
		
	}
	
	
});

Ext.reg("VideosCard", app.views.VideosCard);

