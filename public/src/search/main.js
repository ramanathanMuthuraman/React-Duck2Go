/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Input = require('react-bootstrap').Input;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;
 module.exports = React.createClass({
 	handleFilterChange: function(){
 		var dom = React.findDOMNode(this.refs.searchItem);
 		var value = $("[data-reactid='"+dom.getAttribute("data-reactid")+"']")
 						.find("input.form-control").val();
 		this.props.updateFilter(value);
 	},
    render:function(){

      return    <Input onChange={this.handleFilterChange} type='text' ref="searchItem" buttonAfter= { 
      	<Button onClick={this.handleFilterChange}  bsStyle='success'>
      	<Glyphicon glyph='search' />
      	</Button>
      } />
    }
  });


