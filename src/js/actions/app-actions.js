var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  changeAmount: function (amount) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_AMOUNT,
      amount: amount
    })
  },
  changeRoast: function (roast) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_ROAST,
      roast: roast
    })
  }
}

module.exports = AppActions;
