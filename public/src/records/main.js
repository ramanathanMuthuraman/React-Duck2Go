/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Well = require('react-bootstrap').Well;
var Col = require('react-bootstrap').Col;
var Record =  require('../record/main');
 module.exports = React.createClass({
 	
    render:function(){
    	//when there are no response 
    	if(!this.props.items || !this.props.items.length){
    		
    			return  <Col mdOffset={3}  md={6}>  
    			<Well className="no_results">
                <Col sm={12} md={8} >
                <h2 className="no_response_txt">No results found</h2>
                </Col>
    			<Col sm={4} md={4} >
    				<img className="no_response_img" src ="images/No_result.jpg" />
    			</Col>
    			</Well>
    			</Col>
    		
    	}
    	//when the user resets
    	if(this.props.items[0].reset){
    	
    			return <div></div>
    	
    	}
      return   (
      			<div className="records">
				   {this.props.items.map(function (data,i) {
	      				return (
	      							<Record key={i} datum={data} />
	      						)
	    			
				},this)}
				</div>
				)
    }
  });
