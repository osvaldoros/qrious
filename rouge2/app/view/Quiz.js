Ext.define("Qrious.view.Quiz",{
	extend: 'Ext.Panel',
	xtype:'quizPanel',
	
	config: {
		title: 'Quiz',
		iconCls:'home',
		html:'Quiz',
		items:[
			{xtype: 'headerControl', dock: 'top', title:'Quiz'}
		]
	}
	
})
