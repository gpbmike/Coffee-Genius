/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var Ratio = require('../components/app-ratio.js');
var BeanWeight = require('../components/app-beanweight.js');
var BrewTime = require('../components/app-brewtime.js');
var Guide =
  React.createClass({
    getInitialState: function() {
      return { roast: AppStore.getRoast() };
    },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange)
    },
    _onChange:function(){
      this.setState({ roast: AppStore.getRoast() });
    },
    render:function () {
      var roast = this.state.roast;
      roast = roast.charAt(0).toUpperCase() + roast.slice(1);
      return (
        <form>
          <legend>Brewing Guide</legend>
          <h2>{roast} Roast</h2>
          <Ratio />
          <hr />
          <BeanWeight />
          <hr />
          <BrewTime />
        </form>
      );
    }
  });
module.exports = Guide;
