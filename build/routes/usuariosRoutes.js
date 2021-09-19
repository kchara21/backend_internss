"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Getl all users
        this.router.get('/', usuarioController_1.default.getAll);
        //Get one user
        this.router.get('/:id', usuarioController_1.default.getById);
        //Create a new user
        this.router.post('/', usuarioController_1.default.newUser);
        //Edit user
        this.router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], usuarioController_1.default.editUser);
        //Delete
        this.router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], usuarioController_1.default.deleteUser);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
