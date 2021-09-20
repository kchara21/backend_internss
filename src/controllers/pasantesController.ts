import {Request,Response} from 'express'
import {getRepository } from 'typeorm';
import { Pasante } from '../entities/pasante';


export const getPasantes = async (req: Request, res: Response) => {

    const userRepository = getRepository(Pasante);
    let users;
    try{
         users = await userRepository.find({where:{estado:1}});
    }
    catch(e){
      return res.status(402).json({message:'Not Result'});
    }

    if(users.length>0){
        res.send(users);
    }else{
        res.status(403).json({message:'No interns found'});
    }
  

}


export const getPasanteCedula = async (req: Request, res: Response): Promise<Response> => {
    try{
        const pasante = await getRepository(Pasante).find({where:{ci: req.params.ci,estado:1}});
        if(!pasante){
            return res.json({message:'No interns found'})
        }
        return res.json(pasante);
    }
    catch(e){
        return res.status(404).json({message:"Not Result"});
    }
    
}

export const getPasanteNombre = async (req: Request, res: Response): Promise<Response> => {
    
    try{
        const pasante = await getRepository(Pasante).find({where:{nombre: req.params.nombre,estado:1}});
        return res.json(pasante);
    }catch(e){
        return res.status(404).json({message:"No interns found"});
    }
    
}

export const getPasanteProyecto = async (req: Request, res: Response): Promise<Response> => {
    try{
        const pasante = await getRepository(Pasante).find({proyecto: req.params.proyecto,estado:1});
        return res.json(pasante);    
    }
    catch(e){
        return res.status(404).json({message:"No interns found"});

    }
}


export const createPasante = async (req: Request, res: Response): Promise<Response> => {
    let newPasante;
    let results;
    const {ci} = req.body;
    let pasantes, pasanteInactivo;
    try{
       pasantes = await getRepository(Pasante).find({ci});
       pasanteInactivo = await getRepository(Pasante).findOne({where:{ci,estado:0}}); 
    }catch(e){
        return res.status(404).json({message:'Problems Intern'});
    }

    // De existir en la BD y estar inactivo, pues se actualiza este pasante y se lo activa nuevamente
    if(pasanteInactivo){
        getRepository(Pasante).merge(pasanteInactivo,req.body); //merge: REEMPLAZA LOS DATOS
        pasanteInactivo.estado = 1;
        const results = await getRepository(Pasante).save(pasanteInactivo);
        return res.status(201).json({results,message:'Intern Created!'});
    }

    // De existir y estar activo entonces no dejara crearlo. 
    if(pasantes.length>0){
        return res.status(404).json({message:"Internt already exist"});
    }else{
        try{
            newPasante =  getRepository(Pasante).create(req.body);
            results = await getRepository(Pasante).save(newPasante);   
            return res.status(201).json({results, message:'Intern Created!'});
        }catch(e){
            return res.status(404).json({message:'Problems creating Intern'});
        }
    }     
    
}

export const updatePasante = async (req: Request, res: Response): Promise<Response> => {
    let pasante;
    try{
        pasante = await getRepository(Pasante).findOne(req.params.id);
    }catch(e){
        return res.status(404).json('Problems Intern');
    }
    if(pasante){
        getRepository(Pasante).merge(pasante,req.body); //merge: REEMPLAZA LOS DATOS
        const results = await getRepository(Pasante).save(pasante);
        return res.status(201).json({results,message:'Intern Updated!'});
    }else{
        return res.status(404).json('Intern not found');

    }

}

export const detelePasante = async (req: Request, res: Response): Promise<Response> => {
    let pasante;
    try{
        pasante = await getRepository(Pasante).findOneOrFail(req.params.id); //Hara una busqueda de un dato en concreto en la tabla
        pasante.estado = 0;
        pasante = await getRepository(Pasante).save(pasante); //Hara una busqueda de un dato en concreto en la tabla
    }catch(e){
        return res.status(404).json({message:'Intern not found'});
    }
    return res.status(201).json({pasante,message:'Intern Deleted'});
}


