/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Well = require('react-bootstrap').Well;
var Col = require('react-bootstrap').Col;
 module.exports = React.createClass({
 	
    render:function(){
    var icon = (this.props.datum.Icon&&this.props.datum.Icon.URL) ? this.props.datum.Icon.URL : "images/No_image_available.jpg";
    var content = this.props.datum.Result || "";
    var title="",text="",href = this.props.datum.FirstURL || ""
    if(content){
        var start = content.indexOf(">");
        var end = content.lastIndexOf(">");
        if(start > -1 && end >-1){
          // subtracting 3 to remove the anchor tag markup
          title = content.substring(++start,end-3);
          text =  content.substring(++end);
          //do not render the DOM, if there is no description
          if(!text){
            return <div></div>;
          }
        }
    }
    else{
        return <div></div>;
    }
    if(href){
      href = "https://en.wikipedia.org/wiki"+href.substring(href.lastIndexOf("/"));
    }

      return   <Well className="tile__body has-foot col-sm-5 col-md-5">
      			
				    <div className="col-sm-8 col-md-8">
            <a href={href} target="blank"><h2 className="tile__title">{title}</h2></a>
				    <div className="tile__content">{text}</div>
            </div>
              <p className="col-sm-4 col-md-4 thumbnail"><img src={icon} className="tile__icon" /></p>
				</Well>
    }
  });
