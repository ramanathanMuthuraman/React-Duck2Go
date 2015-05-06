/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
 module.exports = React.createClass({
 	
    render:function(){
    var icon = this.props.datum.Icon ? this.props.datum.Icon.URL : "";
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
    if(href){
      href = "https://en.wikipedia.org/wiki"+href.substring(href.lastIndexOf("/"));
    }

      return   <div className="tile__body has-foot ">
      				<img src={icon} className="tile__icon" />
				    <div><a href={href}><h2 className="tile__title">{title}</h2></a></div>
				    <div className="tile__content">{text}</div>
				</div>
    }
  });
