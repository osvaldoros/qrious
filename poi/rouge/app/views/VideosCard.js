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
	items:[
		{
			height:20,
		},
		{
	        xtype: 'video',
	        url: 'http://qriousmobile.com/poi/rouge/videos/rouge_white.m4v',
	        width: 300,
	        height: 150,
	        posterUrl: 'http://qriousmobile.com/poi/rouge/videos/rouge_white_poster.png'
		},
	]
});

Ext.reg("VideosCard", app.views.VideosCard);
