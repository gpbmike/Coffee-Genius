/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var Ratio =
  React.createClass({
    getInitialState: function() {
      return { ratio: AppStore.getRatio() };
    },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange)
    },
    _onChange:function(){
      this.setState({ ratio: AppStore.getRatio() });
    },
    render:function () {
      var ratio = this.state.ratio;
      return (
        <div>
        Recommended Ratio
        {ratio}
        </div>
      );
    }
  });
module.exports = Ratio;
