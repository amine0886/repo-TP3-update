const express      = require('express');
const usersctrl = require ('./routes/usersctrl');

// routes
exports.router = (function() {
    const apiRouter = express.Router();

    apiRouter.route('/users/register/').post(usersctrl.register);
    apiRouter.route('/users/login/').post(usersctrl.login);

    return apiRouter;
})();