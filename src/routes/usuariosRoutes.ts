import { Router } from "express";
import UsuarioController from '../controllers/usuarioController';
import { checkJwt } from '../middlewares/jwt'; 
import { checkRole } from '../middlewares/role';
class UsuariosRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }


    config():void{
       //Getl all users
       this.router.get('/', UsuarioController.getAll);
    
       //Get one user
       this.router.get('/:id', UsuarioController.getById);

       //Create a new user
       this.router.post('/',UsuarioController.newUser);

       //Edit user
       this.router.patch('/:id', [checkJwt,checkRole(['admin'])], UsuarioController.editUser);

       //Delete
       this.router.delete('/:id', [checkJwt,checkRole(['admin'])], UsuarioController.deleteUser);
    }

}


const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;