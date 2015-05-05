/** @jsx React.DOM */
var React = require('react');
var Input = require('react-bootstrap').Input;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;
 module.exports = React.createClass({
 	handleFilterUpdate: function(){
 		console.log("update")
 	},
    render:function(){

      return   <div><Input type='text' ref="searchItem" />
      			<Button onClick="handleFilterUpdate"  ref="searchItem"  bsStyle='success'><Glyphicon glyph='search' /></Button>
      			</div>
    }
  });
