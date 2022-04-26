import { Router } from 'express';
import { register, login } from './routes/usersctrl';

export const router = (function() {
    var apiRouter = Router();
    
    apiRouter.route('/users/register/').post(register);
    apiRouter.route('/users/login/').post(login);

    return apiRouter;
})();