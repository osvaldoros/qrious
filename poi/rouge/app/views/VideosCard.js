/**/

var vidTmp = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="container">',
		'<div>{title}</div>',
		'<video id="video{id}" autobuffer width="300" height="150" poster="http://qriousmobile.com/poi/rouge/videos/poster_aster_and_goldenrod.png" >',
		'<source src="{url}">',
		'</video>',
		'</div>',
		'</tpl>');

Ext.regModel('Video', {
	fields : ['url', 'id']
});

var videos = new Ext.data.Store({
		model : 'Video',
		data : [{
				url : 'http://qriousmobile.com/poi/rouge/videos/asters_and_goldenrod.m4v',
				id : '1'
			}
		]
	});

var pnl = new Ext.DataView({
		title : 'Video',
		store : videos,
		tpl : vidTmp,
		itemSelector : '.container',
		listeners : {
			itemtap : function (view, index, el, e) {
				rec = videos.getAt(index);
				video = document.getElementById('video' + rec.data.id);
				video.play();
				
			}
		},
		fullscreen : true
	})


var panel = new Ext.Panel({
    width: 300,
    height: 150,

    items: new Ext.DataView({
		title : 'Video',
		store : videos,
		tpl : vidTmp,
		itemSelector : '.container',
		listeners : {
			itemtap : function (view, index, el, e) {
				rec = videos.getAt(index);
				video = document.getElementById('video' + rec.data.id);
				video.play();
				
			}
		},
		fullscreen : true
	})
});



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
			height:60,
		},
		panel,
	]
});

Ext.reg("VideosCard", app.views.VideosCard);




/* this is the original code before it was working on android

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
	        url: 'http://qriousmobile.com/poi/rouge/videos/asters_and_goldenrod.m4v',
	        width: 300,
	        height: 150,
	        posterUrl: 'http://qriousmobile.com/poi/rouge/videos/poster_aster_and_goldenrod.png'
		},
	]
});

Ext.reg("VideosCard", app.views.VideosCard);


*/


