Ext.define("Qrious.view.Map",{
	extend: 'Ext.Panel',
	xtype:'mapPanel',
	
	config: {
		title: 'Map',
		iconCls:'home',
		html:'Map',
		items:[
			{xtype: 'headerControl', dock: 'top', title:'Map'}
		]
	}
	
})
