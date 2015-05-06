/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Record =  require('../record/main');
 module.exports = React.createClass({
 	
    render:function(){
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
