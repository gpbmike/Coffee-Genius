var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

function _apiRequest (endpoint, callback) {

  if (!endpoint || typeof endpoint !== 'string' || !callback || typeof callback !== 'function') {
    return;
  }

  var myRequest = new XMLHttpRequest();
  myRequest.open('GET', 'http://jsonstub.com/coffeegenius/' + endpoint);
  myRequest.setRequestHeader('JsonStub-User-Key', '0cb331ba-d888-4397-a5d4-e3c98bb197fa');
  myRequest.setRequestHeader('JsonStub-Project-Key', '05ffebc9-7519-4efc-8ba1-5d21a07cae5d');
  myRequest.setRequestHeader('Content-Type', 'application/json');

  myRequest.onreadystatechange = function () {
    if (this.readyState === this.DONE) {
      if (this.status === 200) {
        try {
          callback(null, JSON.parse(this.response));
        } catch (error) {
          callback(error);
        }
      } else {
        try {
          callback(JSON.parse(this.response));;
        } catch (error) {
          callback(error);
        }
      }
    }
  };

  myRequest.send();

}

var _roasts = [];

var _amount = 500;

function _setAmount(amount) {
  _amount = amount;
}

var _roast = "medium";

function _setRoast(roast) {
  _roast = roast;
  _fetchRoast(roast);
}

var _fetchRoasts = function () {
  _apiRequest('roasts', function (error, response) {
    if (!error) {
      _roasts = response.roasts;
      AppStore.emitChange();
    }
  });
};

_fetchRoasts();

var _ratio = "";
var _brewTime = 0;

var _fetchRoast = function (roast) {
  _apiRequest('roast/' + roast, function (error, response) {
    if (!error) {
      _ratio = response.ratio;
      _brewTime = response.brewTime;
      AppStore.emitChange();
    }
  });
};

_fetchRoast(_roast);

var AppStore = merge(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT)
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getAmount: function () {
    return _amount;
  },

  getRoast: function () {
    return _roast;
  },

  getRoasts: function () {
    return _roasts;
  },

  getRatio: function () {
    return _ratio;
  },

  getBrewTime: function () {
    return _brewTime;
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.CHANGE_AMOUNT:
        _setAmount(payload.action.amount);
        break;

      case AppConstants.CHANGE_ROAST:
        _setRoast(payload.action.roast);
        break;
    }
    AppStore.emitChange();

    return true;
  })
})

module.exports = AppStore;
