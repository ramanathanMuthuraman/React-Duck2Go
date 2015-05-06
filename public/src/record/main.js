/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
 module.exports = React.createClass({
 	
    render:function(){
    var icon = this.props.datum.Icon ? this.props.datum.Icon.URL : "";
    var title = this.props.datum.Result || "";
    var text = this.props.datum.Text || "";
      return   <div className="tile__body has-foot ">
      				<img src={icon} className="tile__icon" />
				    <h5 className="tile__title" dangerouslySetInnerHTML= {{__html:title}}></h5>
				    <div className="tile__content">{text}</div>
				</div>
    }
  });
