/** @jsx React.DOM */
var React = require('react');
var Amount = require('../components/app-amount.js');
var Roast = require('../components/app-roast.js');
var Guide = require('../components/app-guide.js');
var APP =
  React.createClass({
    render:function(){
      return (
        <div>
        <h1>Coffee Genius</h1>
        <Amount />
        <Roast />
        <Guide />
        </div>
      )
    }
  });
module.exports = APP;
