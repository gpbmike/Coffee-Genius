/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var BeanWeight =
  React.createClass({
    getInitialState: function() {
      return { weight: 0 };
    },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange)
    },
    _onChange:function(){

      var ratio = AppStore.getRatio().split(':');
      var weight = Math.round(AppStore.getAmount() / ratio[1]);

      this.setState({ weight: weight });
    },
    render:function () {
      var weight = this.state.weight;
      return (
        <div>
        Coffee Beans Weight
        {weight}g
        </div>
      );
    }
  });
module.exports = BeanWeight;
