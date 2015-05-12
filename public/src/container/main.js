/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Well = require('react-bootstrap').Well;
var Search =  require('../search/main');
var Records =  require('../records/main');
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

 module.exports = React.createClass({
 	parseResponse: function(data,status,jqXHR){

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
		 this.renderRecords(response);
		 this.releaseRequest(jqXHR);
		 
 	},
 	releaseRequest: function(jqXHR){
 		if(jqXHR){
			 var index = this.requestPool.indexOf(jqXHR);
			 if (index > -1) {
				this.requestPool.splice(index, 1);
			 }
		}

 	},
 	networkErrorHandler: function(xhr){
 		 if (xhr && xhr.status === 0 && xhr.statusText !== 'abort') {
 			alert("Network Error");
 		}
 	},
 	handleFilterUpdate: function(value){
 		var that = this;
 		var duck2go = encodeURIComponent("http://api.duckduckgo.com/?q="+encodeURIComponent(value)+"&format=json");
 		var yql = 'http://query.yahooapis.com/v1/public/yql?q=select * from json where url = "'+duck2go+'"&format=json&callback=';
 		that.abortAllRequests();
 		if(value){
 				//http://stackoverflow.com/questions/5087549/access-denied-to-jquery-script-on-ie
 				if (that.IsMSIE && window.XDomainRequest) {
 					 	var xdr = new XDomainRequest();
			            xdr.open("get", yql);
			            //xdr.onerror = that.networkErrorHandler;
			            xdr.onload = function() {
 
			            	that.parseResponse(JSON.parse(xdr.responseText),"success",xdr)
			              
			            };
			            that.requestPool.push(xdr);
			            xdr.send();
        			}
        			else
        			{
        				$.ajax({
			 		  		dataType : 'json',
			 		  		method:"GET",
			 		 		url:yql,
		 		 			beforeSend: function(jqXHR) {
        					that.requestPool.push(jqXHR);
    					}
			      		}).done(that.parseResponse).fail(that.networkErrorHandler);

        			}
				
 		}
 		else{
 		
 			 that.renderRecords([{reset:true}]);
 			}
    	},
    	componentDidMount: function(){

    		this.requestPool = [];
    		var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
    		this.IsMSIE = (msie>-1)?true:false;
    	},
    	abortAllRequests:function(){

    		for(var i=0;i<this.requestPool.length;i++){
        		this.requestPool[i].abort();
    		}
    		this.requestPool = [];

    	},
    	renderRecords: function(data){
				//if(data)
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
