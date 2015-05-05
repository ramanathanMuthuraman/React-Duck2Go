/** @jsx React.DOM */
var React = require('react');

var Well = require('react-bootstrap').Well;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
 module.exports = React.createClass({
    render:function(){
      return     <Well className = "container-fluid caption-well">
      				<Col xs={12} md={12} > 
      					<div className="jumbotron"> <h1>React Boilerplate</h1>
      					<p>
      						This is a react boilerpate exhibiting isomorphic javascript feature. 
      					</p>
      				    <p>
                            <a className="btn btn-primary custom_link" target="blank" href="https://github.com/ramanathanMuthuraman/react-isomorphic-boilerplate">Learn more</a>
      					</p>
      					</div>
      				</Col>
      			 </Well>
    }
  });
