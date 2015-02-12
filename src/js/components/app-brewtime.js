/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var moment = require('moment');
var BrewTime =
  React.createClass({
    getInitialState: function() {
      return { time: this.formatTime(AppStore.getBrewTime()) };
    },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange)
    },
    formatTime: function (seconds) {
      var duration = moment.duration(seconds, 'seconds');
      return duration.minutes() + ' minutes ' + duration.seconds() + ' seconds';
    },
    _onChange:function () {
      this.setState({ time: this.formatTime(AppStore.getBrewTime()) });
    },
    render:function () {
      var time = this.state.time;
      return (
        <div>
        Brew Time
        {time}
        </div>
      );
    }
  });
module.exports = BrewTime;
