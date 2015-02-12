/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
var Amount =
  React.createClass({
    getInitialState: function() {
      return {value: 500};
    },
    handleInput: function (event) {
      AppActions.changeAmount(event.target.value);
      this.setState({value: event.target.value});
    },
    render:function () {
      var value = this.state.value;
      return (
        <div>
        How much coffee do you want?
        <input type="range" min="250" max="1000" step="50" defaultValue="500" onInput={this.handleInput} />
        {value}g
        </div>
      );
    }
  });
module.exports = Amount;
