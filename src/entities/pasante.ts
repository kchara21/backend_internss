import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';
import { Length, IsNotEmpty, IsEmpty } from "class-validator";

@Entity()
export class Pasante{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 30)
    nombre:string;

    @Column()
    @IsNotEmpty()
    @Length(10)
    ci:string;

    @Column()
    @IsNotEmpty()
    ingresoPracticas:Date;

    @Column()
    egresoPracticas:Date;

    @Column()
    @IsNotEmpty()
    ingresoViamatica:Date;

    @Column()
    @IsNotEmpty()
    lider:string;

    @Column({default:1})
    @IsNotEmpty()
    estado:Number;

    @Column()
    @IsNotEmpty()
    celular:string;

    @Column()
    correo:string;

    @Column()
    @IsNotEmpty()
    semestre:string;

    @Column()
    sector:string;

    @Column()
    avance:string;

    @Column()
    disponibilidad:string;

    @Column()
    observacion:string;


    @Column()
    @IsNotEmpty()
    almuerzo:string;


    @Column()
    tecnologia:string;

    @Column()
    @IsNotEmpty()
    universidad:string;

    @Column()
    @IsNotEmpty()
    carrera:string;

    @Column()
    @IsNotEmpty()
    tipoPasantias:string;


    @Column()
    @IsNotEmpty()
    horario:string;

    @Column()
    @IsNotEmpty()
    proyecto:string;

}