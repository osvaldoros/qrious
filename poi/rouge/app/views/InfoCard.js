

app.views.InfoCard = Ext.extend(Ext.Panel, {
	title: "Text",
	scroll:'vertical',
	iconCls: "textual",
	dockedItems:[
		{xtype:'Header', title:'Text'}
	],
	styleHtmlContent:true,
	
	initComponent: function() {
		
		var owner = this;
		Ext.Ajax.request({
		    url: 'assets/text.html',
		    success: function(response, opts) {
				owner.addContent(response);
		        owner.setLoading(false);
		    }
		});
		
		this.setLoading(true, true);
		app.views.InfoCard.superclass.initComponent.apply(this, arguments);
	},
	
	addContent: function(response){
		this.html = response.responseText;
	}
	
});

Ext.reg("InfoCard", app.views.InfoCard);
