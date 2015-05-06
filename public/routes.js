/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var App = require('./src/main');

var Container =  require('./src/container/main');
 var routes = module.exports =  (
  <Route name="app" path="/" handler={App}>
     <Route name="container" handler={Container}/>
    <DefaultRoute handler={Container}/>
  </Route>
);


