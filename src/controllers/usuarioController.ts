import {getRepository } from 'typeorm';
import {Request,Response} from 'express'
import { User } from '../entities/user';
import {validate} from 'class-validator';

class UsuarioController{

    static getAll = async(req: Request, res: Response)=>{
        const userRepository = getRepository(User);
        let users;
        try{
             users = await userRepository.find({ select: ['id', 'username', 'role'] });
        }
        catch(e){
          return res.status(404).json({message:'Not Result'});
        }

        if(users.length>0){
            res.send(users);
        }else{
            res.status(404).json({message:'Not Result'});
        }
    };


    static getById = async(req: Request, res: Response)=>{
        const {id} = req.params;
        const userRepository = getRepository(User);
        try{
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        }catch(e){
            res.status(404).json({mesagge:'Not Result'});
        }
    };


    static newUser = async(req: Request, res: Response)=>{
        const {username, password, role} = req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;

        //Validate
        const validationOp = {validationError:{target:false,value:false}};
        const errors = await validate(user,validationOp);
        if(errors.length>0){
            return res.status(400).json(errors);
        }

        //TODO: HASH PASSWORD
        const userRepository = getRepository(User);
        try{
            user.hashPassword();
            await userRepository.save(user);
        }catch(e){
            return res.status(400).json({message:'Username already exist'});
        }

        //ALL OK
        res.send(user);
    };

    static editUser = async(req: Request, res: Response)=>{
        let user;
        const {id} = req.params;
        const {username, role} = req.body;

        const userRepository = getRepository(User);
        // Try get User
        try{
            user = await userRepository.findOneOrFail(id);
            user.username = username;
            user.role = role;
        }catch(e){
            return res.status(404).json({message:'User not found'});
        }
        
        const validationOp = {validationError:{target:false,value:false}};
        const errors = await validate(user,validationOp);
        if(errors.length>0){
            return res.status(404).json(errors);
        }

        //Try to Save User
        try{        
            await userRepository.save(user);
        }catch(e){
            return res.status(409).json({message:'Username already in use'});
        }
        res.status(201).json({message:'User Update'});
    };


    static deleteUser = async(req: Request, res: Response)=>{
        const {id} = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message:'User not found'});
        }

        //Remove User
        userRepository.delete(id);
        res.status(201).json({message:'User deleted'});
        
    };

}

export default UsuarioController;