/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Input = require('react-bootstrap').Input;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;
 module.exports = React.createClass({
 	returnInput:function(){
 		var dom = React.findDOMNode(this.refs.searchItem);
 		return $("[data-reactid='"+dom.getAttribute("data-reactid")+"']").find("input.form-control");
 	},
 	handleFilterChange: function(){
 		
 		var value = this.returnInput().val();
 		this.props.updateFilter(value);
 	},
 	componentDidMount: function(){

    		this.returnInput().focus();
    
    },
    clearInput: function(){
      this.returnInput().val("");
      this.props.updateFilter("");
      this.returnInput().focus();
    },
    render:function(){

      return    <Input onChange={this.handleFilterChange} type='text' ref="searchItem" buttonAfter= { 
      	<Button onClick = {this.clearInput} bsStyle='danger'>
      	<Glyphicon glyph='remove' />
      	</Button>
      } />
    }
  });


