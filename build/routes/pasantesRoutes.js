"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pasantesController_1 = require("../controllers/pasantesController");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const express_validation_1 = require("express-validation");
const validationInterns_1 = require("../express-validation/validationInterns");
class PasantesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        const middlewaresDemas = [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])];
        const middlewareCreateUpdate = [jwt_1.checkJwt, (0, role_1.checkRole)(['admin']), (0, express_validation_1.validate)(validationInterns_1.validTextNoEmpty, {}, {})];
        this.router.get('/', pasantesController_1.getPasantes); // LISTAR TODOS 
        this.router.get('/ci/:ci', pasantesController_1.getPasanteCedula); // LISTAR POR CEDULA
        this.router.get('/name/:nombre', pasantesController_1.getPasanteNombre);
        this.router.get('/project/:proyecto', pasantesController_1.getPasanteProyecto);
        this.router.post('/', middlewareCreateUpdate, pasantesController_1.createPasante); // CREAR
        this.router.use(function (err, _req, res, _next) {
            if (err instanceof express_validation_1.ValidationError) {
                return res.status(err.statusCode).json(err);
            }
            return res.status(500).json(err);
        });
        this.router.put('/:id', middlewareCreateUpdate, pasantesController_1.updatePasante); // ACTUALIZAR
        this.router.delete('/:id', middlewaresDemas, pasantesController_1.detelePasante); // ELIMINAR
    }
}
const pasantesRoutes = new PasantesRoutes();
exports.default = pasantesRoutes.router;
