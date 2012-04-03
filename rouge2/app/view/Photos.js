Ext.define("Qrious.view.Photos",{
	extend: 'Ext.Panel',
	xtype:'photosPanel',
	
	config: {
		title: 'Photos',
		iconCls:'home',
		html:'Photos',
		items:[
			{xtype: 'headerControl', dock: 'top', title:'Photos'}
		]
	}
	
})
