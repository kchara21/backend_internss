"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validTextNoEmpty = void 0;
const express_validation_1 = require("express-validation");
exports.validTextNoEmpty = {
    body: express_validation_1.Joi.object().keys({
        nombre: express_validation_1.Joi.string()
            .regex(/[a-zA-Z ]/)
            .required()
            .min(4)
            .max(20)
            .messages({
            'any.required': `Se requiere Nombre`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        ci: express_validation_1.Joi.string()
            .regex(/[0-9]/)
            .required()
            .max(10)
            .min(10)
            .messages({
            'any.required': `Se requiere Cedula`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        ingresoPracticas: express_validation_1.Joi.date()
            .required()
            .messages({
            'any.required': `Se requiere Fecha`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser DATE`
        }),
        egresoPracticas: express_validation_1.Joi.date()
            .required()
            .messages({
            'any.required': `Se requiere Fecha`,
            'string.base': `Debe ser DATE`
        }),
        ingresoViamatica: express_validation_1.Joi.date()
            .required()
            .messages({
            'any.required': `Se requiere Fecha`,
            'string.base': `Debe ser DATE`
        }),
        lider: express_validation_1.Joi.string()
            .regex(/[a-zA-Z ]/)
            .required()
            .messages({
            'any.required': `Se requiere Nombre del Lider`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        estado: express_validation_1.Joi.number()
            .messages({
            'any.required': `Se requiere estado`,
            'string.base': `Debe ser NUMBER`
        }),
        celular: express_validation_1.Joi.string()
            .regex(/[0-9]/)
            .max(10)
            .min(10)
            .messages({
            'any.required': `Se requiere numero celular`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        correo: express_validation_1.Joi.string()
            .required()
            .email()
            .messages({
            'any.required': `Se requiere del Correo`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        semestre: express_validation_1.Joi.string()
            .regex(/[a-zA-Z0-9 ]/)
            .required()
            .messages({
            'any.required': `Se requiere Semestre`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        sector: express_validation_1.Joi.string()
            .regex(/[a-zA-Z0-9 ]/)
            .allow('')
            .messages({
            'any.required': `Se requiere Sector`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        avance: express_validation_1.Joi.string()
            .regex(/[a-zA-Z0-9 ]/)
            .allow('')
            .messages({
            'any.required': `Se requiere Avance`,
            'string.base': `Debe ser STRING`
        }),
        disponibilidad: express_validation_1.Joi.string()
            .regex(/[a-zA-Z0-9 ]/)
            .allow('')
            .messages({
            'any.required': `Se requiere Disponibilidad`,
            'string.base': `Debe ser STRING`
        }),
        observacion: express_validation_1.Joi.string()
            .regex(/[a-zA-Z0-9]/)
            .allow('')
            .messages({
            'any.required': `Se requiere Observacion`,
            'string.base': `Debe ser STRING`
        }),
        almuerzo: express_validation_1.Joi.string()
            .required()
            .allow('')
            .messages({
            'any.required': `Se requiere saber si tendra almuerzo`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        tecnologia: express_validation_1.Joi.string()
            .regex(/[a-zA-Z ]/)
            .allow('')
            .messages({
            'any.required': `Se requiere Tecnologia`,
            'string.base': `Debe ser STRING`
        }),
        universidad: express_validation_1.Joi.string()
            .regex(/[a-zA-Z ]/)
            .required()
            .messages({
            'any.required': `Se requiere Universidad`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        carrera: express_validation_1.Joi.string()
            .regex(/[a-zA-Z ]/)
            .required()
            .messages({
            'any.required': `Se requiere Carrera`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        tipoPasantias: express_validation_1.Joi.string()
            .regex(/[a-zA-Z]/)
            .required()
            .messages({
            'any.required': `Se requiere del Tipo de Pasantias`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        horario: express_validation_1.Joi.string()
            .regex(/[a-zA-Z0-9 ]/)
            .allow('')
            .messages({
            'any.required': `Se requiere del Horario`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
        proyecto: express_validation_1.Joi.string()
            .regex(/[a-zA-Z ]/)
            .allow('')
            .messages({
            'any.required': `Se requiere del Nombre del Proyecto`,
            'string.empty': `Se requiere de Informacion`,
            'string.base': `Debe ser STRING`
        }),
    })
};
