/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Record =  require('../record/main');
 module.exports = React.createClass({
 	
    render:function(){
    	var records = this.props.items.map(function (data) {
	      return <Record datum={data} />;
	    });
      return   <div className="records">
				   {records}
				</div>
    }
  });