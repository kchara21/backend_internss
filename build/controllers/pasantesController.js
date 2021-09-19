"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detelePasante = exports.updatePasante = exports.createPasante = exports.getPasanteProyecto = exports.getPasanteNombre = exports.getPasanteCedula = exports.getPasantes = void 0;
const typeorm_1 = require("typeorm");
const pasante_1 = require("../entities/pasante");
const getPasantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(pasante_1.Pasante);
    let users;
    try {
        users = yield userRepository.find({ where: { estado: 1 } });
    }
    catch (e) {
        return res.status(402).json({ message: 'Not Result' });
    }
    if (users.length > 0) {
        res.send(users);
    }
    else {
        res.status(403).json({ message: 'No interns found ASDASDAD' });
    }
});
exports.getPasantes = getPasantes;
const getPasanteCedula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pasante = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).find({ where: { ci: req.params.ci, estado: 1 } });
        if (!pasante) {
            return res.json({ message: 'No interns found' });
        }
        return res.json(pasante);
    }
    catch (e) {
        return res.status(404).json({ message: "Not Result" });
    }
});
exports.getPasanteCedula = getPasanteCedula;
const getPasanteNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pasante = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).find({ where: { nombre: req.params.nombre, estado: 1 } });
        return res.json(pasante);
    }
    catch (e) {
        return res.status(404).json({ message: "No interns found" });
    }
});
exports.getPasanteNombre = getPasanteNombre;
const getPasanteProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pasante = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).find({ proyecto: req.params.proyecto, estado: 1 });
        return res.json(pasante);
    }
    catch (e) {
        return res.status(404).json({ message: "No interns found" });
    }
});
exports.getPasanteProyecto = getPasanteProyecto;
const createPasante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newPasante;
    let results;
    const { ci } = req.body;
    let pasantes, pasanteInactivo;
    try {
        pasantes = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).find({ ci });
        pasanteInactivo = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).findOne({ where: { ci, estado: 0 } });
    }
    catch (e) {
        return res.status(404).json({ message: 'Problems Intern' });
    }
    // De existir en la BD y estar inactivo, pues se actualiza este pasante y se lo activa nuevamente
    if (pasanteInactivo) {
        (0, typeorm_1.getRepository)(pasante_1.Pasante).merge(pasanteInactivo, req.body); //merge: REEMPLAZA LOS DATOS
        pasanteInactivo.estado = 1;
        const results = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).save(pasanteInactivo);
        return res.status(201).json({ results, message: 'Intern Created!' });
    }
    // De existir y estar activo entonces no dejara crearlo. 
    if (pasantes.length > 0) {
        return res.status(404).json({ message: "Internt already exist" });
    }
    else {
        try {
            newPasante = (0, typeorm_1.getRepository)(pasante_1.Pasante).create(req.body);
            results = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).save(newPasante);
            return res.status(201).json({ results, message: 'Intern Created!' });
        }
        catch (e) {
            return res.status(404).json({ message: 'Problems creating Intern' });
        }
    }
});
exports.createPasante = createPasante;
const updatePasante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pasante;
    try {
        pasante = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).findOne(req.params.id);
    }
    catch (e) {
        return res.status(404).json('Problems Intern');
    }
    if (pasante) {
        (0, typeorm_1.getRepository)(pasante_1.Pasante).merge(pasante, req.body); //merge: REEMPLAZA LOS DATOS
        const results = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).save(pasante);
        return res.status(201).json({ results, message: 'Intern Updated!' });
    }
    else {
        return res.status(404).json('Intern not found');
    }
});
exports.updatePasante = updatePasante;
const detelePasante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pasante;
    try {
        pasante = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).findOneOrFail(req.params.id); //Hara una busqueda de un dato en concreto en la tabla
        pasante.estado = 0;
        pasante = yield (0, typeorm_1.getRepository)(pasante_1.Pasante).save(pasante); //Hara una busqueda de un dato en concreto en la tabla
    }
    catch (e) {
        return res.status(404).json({ message: 'Intern not found' });
    }
    return res.status(201).json({ pasante, message: 'Intern Deleted' });
});
exports.detelePasante = detelePasante;
