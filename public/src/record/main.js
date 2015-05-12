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
        var start = content.indexOf(">")+1;
        //to get the second occurence
        var end = start+content.substring(start).indexOf(">");
        if(start > 0 && end >0){
          // subtracting 3 to remove the anchor tag markup
          title = content.substring(start,end-3);
          text =  content.substring(++end);
          //do not render the DOM, if there is no description
          if(!text){
            if(!this.props.datum.Text){
              return <div></div>;
            }
            text = this.props.datum.Text;
          }
        }
    }
    else{
        return <div></div>;
    }
    if(href){
      href = "https://en.wikipedia.org/wiki"+href.substring(href.lastIndexOf("/"));
    }

      return   <Col sm={12} md={5} className="record">   
                <Well className="tile__body">
            			<Col sm={8} md={8}>   
                  <a href={href} target="blank"><h2 className="tile__title">{title}</h2></a>
      				    <div className="tile__content" dangerouslySetInnerHTML={{__html: text}}></div>
                  </Col>
                  <Col sm={4} md={4} className="thumbnail">   
                  <img src={icon} className="tile__icon" />
                  </Col>
				        </Well>
              </Col>
    }
  });
