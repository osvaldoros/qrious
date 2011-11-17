

var resultsTextArea = new Ext.form.TextArea({
				        html: "You have not answered any questions.",
				      });

// methods


function calculateDesiredHeight() {
    var viewHeight = Ext.Element.getViewportHeight();
    // alert(viewHeight);
    var desiredHeight = viewHeight-100;
	if(desiredHeight > 312) desiredHeight = 312;
    // return desiredHeight;
    return 312;
};


function calculateDesiredPadding() {
    var viewWidth = Ext.Element.getViewportWidth();
    var viewHeight = Ext.Element.getViewportHeight();
    var desiredPadding = 20;
    if(viewHeight > 600) desiredPadding = 40;
    return desiredPadding;
};





// componenet

app.views.QuizCard = Ext.extend(Ext.Panel, {
	title: "Quiz",
	iconCls: "quiz",
	
	answers: ["", "", "", "", ""],
	results: [false, false, false, false, false],
	
	dockedItems:[
		{xtype:'Header', title:'Quiz'}
	],
	
	initComponent: function() {
		
		var owner = this;
		Ext.Ajax.request({
		    url: 'assets/quiz.json',
		    success: function(response, opts) {
				owner.addQuiz(response);
		        owner.setLoading(false);
		    }
		});
		
		this.setLoading(true, true);
		app.views.QuizCard.superclass.initComponent.apply(this, arguments);
	},
	
	radioChecked: function (e){
			
		if(e.name=="radiogroup0") this.answers[0] = e.label;
		if(e.name=="radiogroup1") this.answers[1] = e.label;
		if(e.name=="radiogroup2") this.answers[2] = e.label;
		if(e.name=="radiogroup3") this.answers[3] = e.label;
		if(e.name=="radiogroup4") this.answers[4] = e.label;
		
		this.updateResults();
		
		var owner = this;
		window.setTimeout(function(){owner.nextSlide()},300);
		
	},
	
	
	updateResults: function (){
		
		var score = 0;
		var numQuestions = this.results.length;
		var tempResult;
		var tempString = "";
		
		for(var r=0;r<numQuestions;r++){
			console.log(this.answers[r] + " vs "+this.correctAnswers[r])
			if(this.answers[r]==this.correctAnswers[r]){ 
				score++; 
				this.results[r]=true; 
				tempResult = "correct";
			}else {
				this.results[r]=false;
				tempResult = "incorrect";
			}
			
			if (this.answers[r] == "") {tempResult = "unanswered";}
			tempString += "Question " + (r+1) + " is " + tempResult + "<br>";
		}
		
		resultsString = "Your score is " + score + " / 5.<br>";
		resultsString = resultsString + tempString;
		
		resultsTextArea.update(resultsString);
				
	},
	
	nextSlide: function(){
		var carousel = this.getComponent('carousel');
		var slideNum = carousel.getActiveIndex();
		slideNum++;
		carousel.setActiveItem(slideNum);
	},
	
	addQuiz:function(response){
		var questions = JSON.parse(response.responseText);
		var questionsArray = questions.data;
		
		var items = []
		this.correctAnswers = [];
		for(var i=0; i<questionsArray.length;i++){
			var currentQuestion = questionsArray[i];
			items.push({
				style: 'background-color: #fff',

				items:[
				
			      new Ext.form.TextArea({
			        html: currentQuestion.question
			      }),
				
			      new Ext.form.Radio({
			        name: 'radiogroup' + i,
			        label: currentQuestion.answer1,
					listeners: {
						check:this.radioChecked, scope:this
					},
			      }), 
			      
			      new Ext.form.Radio({
			        name: 'radiogroup' + i,
			        label: currentQuestion.answer2,
					listeners: {
						check:this.radioChecked, scope:this
					},
			      }),
				
				]
				
			})
			
			this.correctAnswers.push(currentQuestion.correct);
			
		}
		
		
		items.push({
			style: 'background-color:#fff',
			items:[
				resultsTextArea
			]			
		});
		
		var carousel = new Ext.Carousel({
			height:calculateDesiredHeight(),
			padding:calculateDesiredPadding(),
			indicator:false,
			cardSwitchAnimation:"slide",
		    items: items,
			id:'carousel'
		});
		
		this.add(carousel)
		
	}
	
});

Ext.reg("QuizCard", app.views.QuizCard);