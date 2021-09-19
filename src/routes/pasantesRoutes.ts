import { Router, Request, Response, NextFunction} from "express";
import { getPasantes, getPasanteCedula, createPasante, detelePasante, updatePasante, getPasanteProyecto,getPasanteNombre} from '../controllers/pasantesController';
import { checkJwt } from '../middlewares/jwt'; 
import { checkRole } from '../middlewares/role';
import {validate,ValidationError} from 'express-validation';
import {validTextNoEmpty} from '../express-validation/validationInterns';


class PasantesRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config():void{

        const middlewaresDemas = [checkJwt,checkRole(['admin'])];
        const middlewareCreateUpdate = [checkJwt,checkRole(['admin']),validate(validTextNoEmpty,{},{})];


        
        this.router.get('/',getPasantes); // LISTAR TODOS 
        this.router.get('/ci/:ci',getPasanteCedula); // LISTAR POR CEDULA
        this.router.get('/name/:nombre',getPasanteNombre);
        this.router.get('/project/:proyecto',getPasanteProyecto);



        this.router.post('/',middlewareCreateUpdate, createPasante); // CREAR
        
        this.router.use(function (err: Error, _req: Request, res: Response, _next: NextFunction) {
            if (err instanceof ValidationError) {
                return res.status(err.statusCode).json(err)
            }
            return res.status(500).json(err)
        })

        
        this.router.put('/:id',middlewareCreateUpdate,updatePasante); // ACTUALIZAR
        this.router.delete('/:id',middlewaresDemas,detelePasante); // ELIMINAR

    }

}


const pasantesRoutes = new PasantesRoutes();
export default pasantesRoutes.router;