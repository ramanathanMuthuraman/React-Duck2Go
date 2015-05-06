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
 		var duck2go = encodeURIComponent("http://api.duckduckgo.com/?q="+value+"&format=json");
 		var yql = 'https://query.yahooapis.com/v1/public/yql?q=select * from json where url = "'+duck2go+'"&format=json&callback=';
 		that.abortAllRequests();
 		if(value){
 			
		 		  $.ajax({
		 		  		dataType : 'json',
		 		 		method:"GET",
		 		 		url:yql,
		 		 		beforeSend: function(jqXHR) {
        					that.xhrPool.push(jqXHR);
    					}
			      		}).done(function (data,status,jqXHR) {
			      			data = data.query.results.json;
			      			var response = data.RelatedTopics;
			      			if(data.RelatedTopics){
				      			for(var i=0;i<data.RelatedTopics.length;i++){
				      				if(data.RelatedTopics[i].Topics){
				      					for(var j=0;j<data.RelatedTopics[i].Topics.length;j++){
				      						 response.push(data.RelatedTopics[i].Topics[j])
				      					}
						      			
						      		}
				      			}
			      			}
			      			 that.renderRecords(response);
			      			 var index = that.xhrPool.indexOf(jqXHR);
					        if (index > -1) {
					            that.xhrPool.splice(index, 1);
					        }
			      			
			      			
					});

				
 		}
 		else{
 		
 			 that.renderRecords([]);
 			}
    	},
    	componentDidMount: function(){

    		this.xhrPool = [];
    
    	},
    	abortAllRequests:function(){

    		for(var i=0;i<this.xhrPool.length;i++){
        		this.xhrPool[i].abort();
    		}
    		this.xhrPool = [];

    	},
    	renderRecords: function(data){
				if(data)
    			React.render(<Records items={data} />, document.querySelector(".contents"));
    		
    	},
	    render:function(){
	      return     <div>
	      			 <Well className = "container-fluid">
	      			 	<Col xs={1} md={1} className="thumbnail">
	      			 	  <img className="logo" src = "images/ddg.jpg" />
	      			 	</Col>
	      				<Col className="search" xs={11} md={11} >  
	      				<Search type='text'  updateFilter={this.handleFilterUpdate}  />
	      				<small>* Search DuckDuckGo</small>
	      				</Col>
	      			 </Well>
	      			 <div className="contents"></div>
	      			 </div>
	    }
  });
