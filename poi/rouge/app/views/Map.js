(function() {
	
	app.views.Map = Ext.extend(Ext.Panel, {
		fullscreen:true,
		title: "Map",
		//scroll:'vertical',
		dockedItems:[
			{
				style:'background-color:#AAAAAA;',
				layout:'hbox',
				height:30,
				items:[
					{
						x:5,
						xtype:'button', 
						ui:'action-small',
						text:'back', 
						handler: function(){
							app.views.viewport.setActiveItem(0, {type:'cube', direction:'left'});
						}
					},
				]
			},
			{
				height:'95%',
				width:'95%',
				cls: 'img mapImage',
			}
		],
	});
	
	Ext.reg("Map", app.views.Map);

})();
