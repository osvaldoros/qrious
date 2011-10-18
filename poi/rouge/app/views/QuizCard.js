
// variables

var answer1 = "";
var answer2 = "";
var answer3 = "";
var answer4 = "";
var answer5 = "";





// methods

function nextQuestion(e){
	var slideNum = carousel.getActiveIndex();
	slideNum++
	carousel.setActiveItem(slideNum);
}


function submit(e){
	alert ('Your score is ' + score() + " out of 5.");
}


function radioChecked(e){
	
	if(e.name=="radiogroup1") answer1 = e.label;
	if(e.name=="radiogroup2") answer2 = e.label;
	if(e.name=="radiogroup3") answer3 = e.label;
	if(e.name=="radiogroup4") answer4 = e.label;
	if(e.name=="radiogroup5") answer5 = e.label;
	
}

function score(){

	var score = 0;
	
	if(answer1=="no") score++;
	if(answer2=="late summer/fall") score++;
	if(answer3=="nectar") score++;
	if(answer4=="goldenrod") score++;
	if(answer5=="aster") score++;
	
	return score;
}



// carousel

var carousel = new Ext.Carousel({

	height:400,
	indicator:false,
	// margin:50,
	padding: '50',
	

    items: [
				{
					style: 'background-color: #fff',
					
					dockedItems:[
						{xtype:'button', dock:'bottom', text:'next', handler:nextQuestion}
					],
					
					items:[
					
				      new Ext.form.TextArea({
				        html: '<body>Is goldenrod a major cause of hayfever?<br><br></body>'
				      }),
					
				      new Ext.form.Radio({
				        name: 'radiogroup1',
				        label: 'yes',
						listeners: {
							check:radioChecked,
						},
				      }), 
				      
				      new Ext.form.Radio({
				        name: 'radiogroup1',
				        label: 'no',
						listeners: {
							check:radioChecked,
						},
				      }),
					
					]
					
				},
				
				{
					style: 'background-color: #fff',
					
					dockedItems:[
						{xtype:'button', dock:'bottom', text:'next', handler:nextQuestion}
					],
					
					items:[
					
				      new Ext.form.TextArea({
				        html: '<body>When do goldenrod and aster bloom?<br><br></body>'
				      }),
					
				      new Ext.form.Radio({
				        name: 'radiogroup2',
				        label: 'spring',
						listeners: {
							check:radioChecked,
						},
				      }), 
				      
				      new Ext.form.Radio({
				        name: 'radiogroup2',
				        label: 'late summer/fall',
						listeners: {
							check:radioChecked,
						},
				      }),
					
					]
					
				},
				
				
				{
					style: 'background-color: #fff',
					
					dockedItems:[
						{xtype:'button', dock:'bottom', text:'next', handler:nextQuestion}
					],
					
					items:[
					
				      new Ext.form.TextArea({
				        html: '<body>What do bees and butterfly consume from these plants?<br><br></body>'
				      }),
					
				      new Ext.form.Radio({
				        name: 'radiogroup3',
				        label: 'nectar',
						listeners: {
							check:radioChecked,
						},
				      }), 
				      
				      new Ext.form.Radio({
				        name: 'radiogroup3',
				        label: 'seeds',
						listeners: {
							check:radioChecked,
						},
				      }),
					
					]
					
				},
				
				{
					style: 'background-color: #fff',
					
					dockedItems:[
						{xtype:'button', dock:'bottom', text:'next', handler:nextQuestion}
					],
					
					items:[
					
				      new Ext.form.TextArea({
				        html: '<body>Which plant contains rubber?<br><br></body>'
				      }),
					
				      new Ext.form.Radio({
				        name: 'radiogroup4',
				        label: 'aster',
						listeners: {
							check:radioChecked,
						},
				      }), 
				      
				      new Ext.form.Radio({
				        name: 'radiogroup4',
				        label: 'goldenrod',
						listeners: {
							check:radioChecked,
						},
				      }),
					
					]
					
				},
				
				
				{
					style: 'background-color: #fff',
					
					dockedItems:[
						{xtype:'button', dock:'bottom', text:'submit', handler:submit}
					],
					
					items:[
					
				      new Ext.form.TextArea({
				        html: '<body>Which plant derives its name from the Greek word for star?<br><br></body>'
				      }),
					
				      new Ext.form.Radio({
				        name: 'radiogroup5',
				        label: 'aster',
						listeners: {
							check:radioChecked,
						},
				      }), 
				      
				      new Ext.form.Radio({
				        name: 'radiogroup5',
				        label: 'goldenrod',
						listeners: {
							check:radioChecked,
						},
				      }),
					
					]
					
				},

    ]
});




// componenet

app.views.QuizCard = Ext.extend(Ext.Panel, {
	title: "Quiz",
	iconCls: "quiz",
	
	dockedItems:[
		{xtype:'Header', title:'Quiz'}
	],

	items: [
		carousel,
	]
	
});

Ext.reg("QuizCard", app.views.QuizCard);