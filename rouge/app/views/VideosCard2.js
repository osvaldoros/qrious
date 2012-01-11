var vidTmp2 = new Ext.XTemplate(
		'<tpl for=".">',
		'<center>',
		'<video id="video{id}" width="144" height="82" poster="{poster}" >',
		'<source src="{url}">',
		'</video><br>',
		'{name} <p style="font-size: 10pt">{length}</p>',
		'</center>',
		'</tpl>');




app.views.VideosCard2 = Ext.extend(Ext.Panel, {
	title: "Videos",
	iconCls: "videos",
	dockedItems:[
		{xtype:'Header', title:'Video'},
	],
	
	layout:{
		type:'fit',
		align:'center'
	},
		
	initComponent: function() {
		/**/
		Ext.regModel('Videos', {
		    fields: ['name', 'poster', 'url', 'id']
		});

		
		var store = new Ext.data.JsonStore({
		    model  : 'Videos',
		    data: []
		});
		
		
		var list = new Ext.List({
		    itemTpl : vidTmp2,
		    store: store
		});
		
		list.addListener('itemtap', function(event, target){
			var videoElem = document.getElementById('video' + store.getAt(target).data.id);
			videoElem.play();
			// deselect(target);
		});
		
		
		var owner = this;
		Ext.Ajax.request({
		    url: 'json/videos.json',
		    success: function(response, opts) {
				var videos = JSON.parse(response.responseText);
				store.loadData(videos.data, false);
		        owner.setLoading(false);
		    }
		});
		
		
		this.setLoading(true, true);
		
		app.views.VideosCard2.superclass.initComponent.apply(this, arguments);
		
		owner.add(list);
		
	},


});


Ext.reg("VideosCard2", app.views.VideosCard2);


