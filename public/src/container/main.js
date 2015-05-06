/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Well = require('react-bootstrap').Well;
var Search =  require('../search/main');
var Records =  require('../records/main');
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

 module.exports = React.createClass({
 	handleFilterUpdate: function(value){
 		var that = this;
 		var duck2go = '"http://api.duckduckgo.com/?q='+value+'&format=json"';
 		var yql = "https://query.yahooapis.com/v1/public/yql?q='select * from json where url = "+ duck2go+"&format=json&callback='";
 		if(value){
		 		  $.ajax({
		 		 		method:"GET",
		 		 		url:yql,
		 		 		dataType:"json"
			      		}).done(function (data) {
			      			
			      			var response = data.RelatedTopics;
			      			for(var i=0;i<data.RelatedTopics.length;i++){
			      				if(data.RelatedTopics[i].Topics){
			      					for(var j=0;j<data.RelatedTopics[i].Topics.length;j++){
			      						 response.push(data.RelatedTopics[i].Topics[j])
			      					}
					      			
					      		}
			      			}
			      			 that.renderRecords(response);
			      			
					}).fail(function(f){
           				console.log("error");
                	}); 

				
 		}
 		else{
 		
 			 that.renderRecords([]);
 		}
    	},
    	
    	renderRecords: function(data){

    		
    		React.render(<Records items={data} />, document.querySelector(".contents"));

    	},
	    render:function(){
	      return     <div>
	      			 <Well className = "container-fluid">
	      				<Col xs={12} md={12} >  <Search type='text'  updateFilter={this.handleFilterUpdate}  /></Col>
	      			 </Well>
	      			 <div className="contents"></div>
	      			 </div>
	    }
  });
