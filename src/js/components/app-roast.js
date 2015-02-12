/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
var AppStore = require('../stores/app-store.js');
var Roast =
  React.createClass({
    getInitialState: function() {
      return {
        roast: AppStore.getRoast(),
        roasts: AppStore.getRoasts()
      };
    },
    handleInput: function (event) {
      AppActions.changeRoast(event.target.value);
      this.setState({ roast: event.target.value });
    },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange);
    },
    _onChange:function(){
      this.setState({ roasts: AppStore.getRoasts() });
    },
    render:function () {
      var roasts = this.state.roasts.map(function(roast){
        return <option key={roast}>{roast}</option>
      });
      var roast = this.state.roast;
      return (
        <div>
        What type of roast?
        <select value={roast} onInput={this.handleInput}>
        {roasts}
        </select>
        </div>
      );
    }
  });
module.exports = Roast;
