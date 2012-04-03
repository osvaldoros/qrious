Ext.define("Qrious.view.Text",{
	extend: 'Ext.Panel',
	xtype:'textPanel',
	
	config: {
		title: 'Text',
		iconCls:'home',
		html:'Text',
		items:[
			{xtype: 'headerControl', dock: 'top', title:'Text'}
		]
	}
	
})
