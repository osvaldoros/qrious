app.views.QuizCard = Ext.extend(Ext.Panel, {
	title: "Quiz",
	iconCls: "quiz",
		dockedItems:[
		{xtype:'Header'}
	],
	html:""
});

Ext.reg("QuizCard", app.views.QuizCard);
