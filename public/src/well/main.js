/** @jsx React.DOM */
var React = require('react');

var Well = require('react-bootstrap').Well;
var Input =  require('../textfield/main');
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
 module.exports = React.createClass({
    render:function(){
      return     <Well className = "container-fluid caption-well">
      				<Col xs={12} md={12} > 
      					<Input type='text'  />
      				</Col>
      			 </Well>
    }
  });
