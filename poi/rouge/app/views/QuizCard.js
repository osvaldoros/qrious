
// variables

var answers = ["", "", "", "", ""];

var results = [false, false, false, false, false];



var resultsTextArea = new Ext.form.TextArea({
				        html: ""
				      })

// methods


function calculateDesiredWidth() {
    var viewWidth = Ext.Element.getViewportWidth();
    var viewHeight = Ext.Element.getViewportHeight();
    var desiredHeight = viewHeight-100;
	if(desiredHeight > 312) desiredHeight = 312;
    return desiredHeight;
};


function calculateDesiredPadding() {
    var viewWidth = Ext.Element.getViewportWidth();
    var viewHeight = Ext.Element.getViewportHeight();
    var desiredPadding = 20;
    if(viewHeight > 600) desiredPadding = 40;
    return desiredPadding;
};



function nextQuestion(e){
	var slideNum = carousel.getActiveIndex();
	slideNum++;
	carousel.setActiveItem(slideNum);
}


function submit(e){
		
	var slideNum = carousel.getActiveIndex();
	slideNum++;
	carousel.setActiveItem(slideNum);
	
	resultsString = "Your score is " + score() + " / 5.<br>";
	
	var arLen = results.length;
	for ( var i=0; i<arLen; i++ ){
		
		var tempResult;
		
		if (results[i]== true){ tempResult = "correct";
		} else tempResult = "incorrect";
	
		var tempString = "Answer " + (i+1) + " is " + tempResult + "<br>";
		
		resultsString = resultsString + tempString;
		
	}
	
	resultsTextArea.update(resultsString);
			
}


function radioChecked(e){
		
	if(e.name=="radiogroup1") answers[0] = e.label;
	if(e.name=="radiogroup2") answers[1] = e.label;
	if(e.name=="radiogroup3") answers[2] = e.label;
	if(e.name=="radiogroup4") answers[3] = e.label;
	if(e.name=="radiogroup5") answers[4] = e.label;
	
}


function score(){

	var score = 0;
	
	if(answers[0]=="no"){ score++; results[0]=true; }
	else {results[0]=false}
	if(answers[1]=="late summer/fall"){ score++; results[1]=true; }
	else {results[1]=false}
	if(answers[2]=="nectar"){ score++; results[2]=true; }
	else {results[2]=false}
	if(answers[3]=="goldenrod"){ score++; results[3]=true; }
	else {results[3]=false}
	if(answers[4]=="aster"){ score++; results[4]=true; }
	else {results[4]=false}

	return score;
}



// carousel

var carousel = new Ext.Carousel({

	height:calculateDesiredWidth(),
	padding:calculateDesiredPadding(),
	
	indicator:false,
	
	// centered:true,
	
    items: [
				{
					style: 'background-color: #fff',
					
					dockedItems:[
						{xtype:'button', dock:'bottom', text:'next', handler:nextQuestion}
					],
					
					items:[
					
				      new Ext.form.TextArea({
				        html: '<body>Question 1:<br>Is goldenrod a major cause of hayfever?<br></body>'
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
				        html: '<body>Question 2:<br>When do goldenrod and aster bloom?<br></body>'
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
				        html: '<body>Question 3:<br>What do bees and butterfly consume from these plants?<br></body>'
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
				        html: '<body>Question 4:<br>Which plant contains rubber?<br></body>'
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
				        html: '<body>Question 5:<br>Which plant derives its name from the Greek word for star?<br></body>'
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
				
				
				
				
				{
					style: 'background-color: #fff',
					
					items:[
					
				      resultsTextArea,
					
					]
					
				},
				/**/
				

    ]
});



var panel = new Ext.Panel({
	layout:{
		type:'vbox',
		pack:'center',
	},
	items: [
		carousel,
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
		// panel,
	]
	
});

Ext.reg("QuizCard", app.views.QuizCard);