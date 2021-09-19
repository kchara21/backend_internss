import { Joi,ValidationError } from 'express-validation';
import { IsEmpty, IsNotEmpty, IsEmail } from 'class-validator';

export const validTextNoEmpty ={
    body: Joi.object().keys({
        
        nombre: Joi.string()
        .regex(/[a-zA-Z ]/)
        .required()
        .min(4)
        .max(20)
        .messages({
            'any.required':`Se requiere Nombre`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        ci: Joi.string()
        .regex(/[0-9]/)
        .required()
        .max(10)
        .min(10)
        .messages({
            'any.required':`Se requiere Cedula`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),


        ingresoPracticas: Joi.date()
        .required()
        .messages({
            'any.required':`Se requiere Fecha`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser DATE`
        }),

        egresoPracticas: Joi.date()
        .required()
        .messages({
            'any.required':`Se requiere Fecha`,
            'string.base': `Debe ser DATE`
        }),
        


        ingresoViamatica: Joi.date()
        .required()
        .messages({
            'any.required':`Se requiere Fecha`,
            'string.base': `Debe ser DATE`
        }),

        lider: Joi.string()
        .regex(/[a-zA-Z ]/)
        .required()
        .messages({
            'any.required':`Se requiere Nombre del Lider`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        estado: Joi.number()
        .messages({
            'any.required':`Se requiere estado`,
            'string.base': `Debe ser NUMBER`
        }),


        celular: Joi.string()
        .regex(/[0-9]/)
        .max(10)
        .min(10)
        .messages({
            'any.required':`Se requiere numero celular`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),


        correo: Joi.string()
        .required()
        .email()
        .messages({
            'any.required':`Se requiere del Correo`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),


        semestre: Joi.string()
        .regex(/[a-zA-Z0-9 ]/)
        .required()
        .messages({
            'any.required':`Se requiere Semestre`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        sector: Joi.string()
        .regex(/[a-zA-Z0-9 ]/)
        .allow('')
        .messages({
            'any.required':`Se requiere Sector`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        avance: Joi.string()
        .regex(/[a-zA-Z0-9 ]/)
        .allow('')
        .messages({
            'any.required':`Se requiere Avance`,
            'string.base': `Debe ser STRING`
        }),

        disponibilidad: Joi.string()
        .regex(/[a-zA-Z0-9 ]/)
        .allow('')
        .messages({
            'any.required':`Se requiere Disponibilidad`,
            'string.base': `Debe ser STRING`
        }),

        observacion: Joi.string()
        .regex(/[a-zA-Z0-9]/)
        .allow('')
        .messages({
            'any.required':`Se requiere Observacion`,
            'string.base': `Debe ser STRING`
        }),

        almuerzo: Joi.string()
        .required()
        .allow('')
        .messages({
            'any.required':`Se requiere saber si tendra almuerzo`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        tecnologia: Joi.string()
        .regex(/[a-zA-Z ]/)
        .allow('')
        .messages({
            'any.required':`Se requiere Tecnologia`,
            'string.base': `Debe ser STRING`
        }),

        
        universidad: Joi.string()
        .regex(/[a-zA-Z ]/)
        .required()
        .messages({
            'any.required':`Se requiere Universidad`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        carrera: Joi.string()
        .regex(/[a-zA-Z ]/)
        .required()
        .messages({
            'any.required':`Se requiere Carrera`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        tipoPasantias: Joi.string()
        .regex(/[a-zA-Z]/)
        .required()
        .messages({
            'any.required':`Se requiere del Tipo de Pasantias`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        horario: Joi.string()
        .regex(/[a-zA-Z0-9 ]/)
        .allow('')
        .messages({
            'any.required':`Se requiere del Horario`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),

        proyecto: Joi.string()
        .regex(/[a-zA-Z ]/)
        .allow('')
        .messages({
            'any.required':`Se requiere del Nombre del Proyecto`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),



    })
}