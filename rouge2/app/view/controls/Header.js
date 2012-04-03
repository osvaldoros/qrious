Ext.define("Qrious.view.controls.Header",{
	extend: 'Ext.Panel',
	xtype:'headerControl',
	
	
	config: {
		style:'background-color:#1e2e40',
		height:30,
		
		items: [
				{
					id:'containerBox',
					layout:{
						type:'hbox',
					},
					items:[
						{y:5, x:5, id:'titlePanel', tpl:'<p style="color:#ffffff;">{title}</p>'},
						{xtype:'spacer'},
						{
							cls: 'gamification',
							width:60,
							height:30
						},
						
						{width:10}
					]
				}
            ],
	}
	
})
