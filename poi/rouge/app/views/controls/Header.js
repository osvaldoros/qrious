app.views.controls = {};
app.views.controls.Header = Ext.extend(Ext.Panel, {
	style:'background-color:#1e2e40',
	height:30,
	id:'toolbar',
	
	initComponent: function() {
        Ext.apply(this, {
			
            items: [
				{
					id:'containerBox',
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
						{y:5, x:5, id:'titlePanel', tpl:'<p style="color:#ffffff;">{title}</p>'},
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
							width:60,
							height:30,
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
			},
			
			addTitle:function(response){
				var titleData = JSON.parse(response.responseText);
				var titleArray = titleData.data;
				
				var firstTitle = titleArray[0];
				
				var containerBox = this.getComponent('containerBox');
				var titlePanel = containerBox.getComponent('titlePanel');
				titlePanel.update(firstTitle);
				app.POITitle = firstTitle;
				
			}
			
        });
		
		var owner = this;
		Ext.Ajax.request({
		    url: 'assets/title.json',
		    success: function(response, opts) {
				owner.addTitle(response);
		        owner.setLoading(false);
		    }
		});
		
		this.setLoading(true, true);

        app.views.controls.Header.superclass.initComponent.apply(this, arguments);
    }
	
});


Ext.reg("Header", app.views.controls.Header);
