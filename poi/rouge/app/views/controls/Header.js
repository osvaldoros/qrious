app.views.controls = {};
app.views.controls.Header = Ext.extend(Ext.Panel, {
	style:'background-color:#AAAAAA',
	height:30,
	id:'toolbar',
	
	initComponent: function() {
        Ext.apply(this, {
			
            items: [
				{
					y:5,
					x:5,
					layout:{
						type:'hbox',
					},
					items:[
					       
					    /* 
						{
							xtype:'button',
							text:'Map', 
							ui:'action-small',
							handler: function(){
								app.views.viewport.setActiveItem(2, {type:'cube', direction:'right'});
							}
						},
						*/
					    // {xtype:'spacer'},
						{html:'Asters and Goldenrod'},
						{xtype:'spacer'},
						/*
						{width:16, height:16, cls:'poi_visited'},
						{width:16, height:16, cls:'poi_not_visited'},
						{width:16, height:16, cls:'poi_visited'},
						{width:16, height:16, cls:'poi_not_visited'},
						{width:16, height:16, cls:'poi_not_visited'},
						{width:10},
						
						*/
						{
							cls: 'gamification',
							width:72,
							height:18,
							listeners:{
								el:{
									tap:function(){this.showGamificationTip()},
									scope:this
								},
							},
						},
						
						{width:10}
					]
				}
            ],
			
			showGamificationTip: function() {
				if (!this.popup) {
					this.popup = new Ext.Panel({
						floating: true,
						modal: true,
						centered: true,
						width: 300,
						height: 200,
						styleHtmlContent: true,
						scroll: 'vertical',
						html: '<p>The next release will include a "game" capability that will allow you to earn points by visiting each of the Points of Interest along the trail and completing the quizzes.</p>',
						dockedItems: [{
							dock: 'top',
							xtype: 'toolbar',
							title: 'Coming Soon'
						}]
						});
				}
				this.popup.show('pop');
			}
        });

        app.views.controls.Header.superclass.initComponent.apply(this, arguments);
    }
	
});


Ext.reg("Header", app.views.controls.Header);
