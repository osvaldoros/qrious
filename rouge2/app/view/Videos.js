Ext.define("Qrious.view.Videos",{
	extend: 'Ext.Panel',
	xtype:'videosPanel',
	
	
	config: {
		title: 'Videos',
		scrollable: true,
		iconCls:'home',
		
		html:'Videos',
		items:[
			{xtype: 'headerControl', dock: 'top', title:'Videos'}
		]
	}
	
})
