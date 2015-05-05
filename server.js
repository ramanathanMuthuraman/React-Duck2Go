/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var express = require('express');
var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');
var config = require('./config')

var app = express();
app.use(express.static(__dirname + '/build'));
app.set('views', __dirname + '/views');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.engine('hbs', exphbs({defaultLayout: 'main',extname: ".hbs", layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');


app.use(express.static("./build"));
require('node-jsx').install({ harmony: true });
var routes = require('./public/routes');

app.use(function(req, res) {
Router.run(routes, req.path, function (Handler) {
	 res.render('index',{markup:React.renderToString(React.createElement(Handler, { path: req.path }))});
  });

}).listen(config.PORT);

 module.exports = app;