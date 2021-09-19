import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';
import pasantesRoutes from './routes/pasantesRoutes';
import authRoutes from './routes/authRoutes';
import usuariosRoutes from './routes/usuariosRoutes';

createConnection().then(async connection=>{
    console.log('DB Connected');
}).catch(err=>console.log(err));

class Server{
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{ //Configurara la propiedad "app"
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        //Middlewares
        this.app.use(cors({credentials: true})); // Obtener permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece.
        this.app.use(helmet());
        
        this.app.use(express.json()); // Para poder recibir datos JSON y entenderlos.
        this.app.use(express.urlencoded({extended:false})); // Em caso de querer enviar desde un form. HTML
    }


    routes(): void{ // Definir de app las rutas de mi servidor
         this.app.use('/interns',pasantesRoutes);
         this.app.use('/auth',authRoutes);
         this.app.use('/users',usuariosRoutes);

    }

    start(): void{ // Para que el servidor empiece a escuchar
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Server on port`, this.app.get('port'));
        });
    }


}

const server = new Server();
server.start();
