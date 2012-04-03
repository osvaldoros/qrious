Ext.define("Qrious.view.Main", {
    extend: 'Ext.tab.Panel',
    //fullscreen: true,
	//layout:"card",
	//cardSwitchAnimation:'cube',
	
    requires: ['Ext.TitleBar'],
    
    config: {
    	tabBarPosition:'bottom',
        items: [
	        //Ext.create('Ext.tab.Panel', {
	        	
	        	//config:{
	        		//items:[
			            { xtype: 'videosPanel' },
			            { xtype: 'photosPanel' },
			            { xtype: 'textPanel' },
			            { xtype: 'quizPanel' },
			            { xtype: 'mapPanel' }
	        		//]
	        	//}
	        	
	        //}),
	        //{ xtype: 'galleryPanel' }
        ]
    }
});