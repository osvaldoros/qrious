Ext.define('Video', {
	extend: 'Ext.data.Model',
	config:{
	    fields: ['name', 'poster', 'url', 'id'],
	    proxy:{
	    	type:'rest',
	    	url: 'json/videos.json',
	    	reader: {
	    		type: 'json',
	    		rootProperty:'data'
	    	}
	    }
	}
});


var vidTmp2 = new Ext.XTemplate([
	'<tpl for=".">',
	'<center>',
	'<video id="video{id}" width="144" height="82" poster="{poster}" >',
	'<source src="{url}">',
	'</video><br>',
	'{name} <p style="font-size: 10pt">{length}</p>',
	'</center>',
	'</tpl>'].join()
);

	
Ext.define("Qrious.view.Videos",{
	extend: 'Ext.Panel',
	xtype:'videosPanel',
	requires:['Ext.data.Store'],
	
	config: {
		title: 'Videos',
		scrollable: true,
		iconCls:'home',
		
		html:'Videos',
		items:[
			{xtype: 'headerControl', dock: 'top', title:'Videos'},
			new Ext.List({
			    itemTpl : vidTmp2,
			    store: Ext.create('Ext.data.Store',{
			    	model: 'Video'
			    })
			})
		]
	}
	
})
