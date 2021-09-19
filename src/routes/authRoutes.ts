import { Router } from "express";
import AuthController from '../controllers/authController';
import { checkJwt } from '../middlewares/jwt';

class AutenticarRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/login',AuthController.login);
        this.router.post('/change-password',[checkJwt],AuthController.changePassword);
    }

}


const autenticarRoutes = new AutenticarRoutes();
export default autenticarRoutes.router;