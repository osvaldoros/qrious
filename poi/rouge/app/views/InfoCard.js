app.views.InfoCard = Ext.extend(Ext.Panel, {
	title: "Text",
	scroll:'vertical',
	iconCls: "textual",
	dockedItems:[
		{xtype:'Header', title:'Text'}
	],
	styleHtmlContent:true,
	html:"<p>New England Aster<br>(symphyotrichum novae-angliae)<br> <br>The aster is a perennial wildflower that is common throughout North America (east of the Rocky Mountains) and because of its simple beauty has been introduced in other countries around the world.<br> <br>The name aster originates from the ancient Greek word for star, as the rays from the centre of the aster make it look like a star.<br> <br>There are more than 30 species of aster in Ontario, and because the aster blooms in the late summer and fall its seeds are in important source of food for birds and animals that over-winter in Ontario.<br><br><br><br>Canada Goldenrod<br>(solidago Canadensis)<br> <br>Goldenrod is another member of the Asteraceae (aster) family. Native to Canada, it is common throughout North America.<br> <br>Like the aster, goldenrod blooms in the late summer and early fall. Once considered a weed, goldenrod has recently become popular with gardeners (but is considered an invasive species in parts of Europe).<br> <br>Goldenrod leaves contain small amounts of rubber and the tires on some early Model T Ford automobiles were made from goldenrod.<br><br><br>(sources: Wikipedia, Wildflowers of Ontario)</p>"
});

Ext.reg("InfoCard", app.views.InfoCard);
