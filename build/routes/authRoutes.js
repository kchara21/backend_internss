"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const jwt_1 = require("../middlewares/jwt");
class AutenticarRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/login', authController_1.default.login);
        this.router.post('/change-password', [jwt_1.checkJwt], authController_1.default.changePassword);
    }
}
const autenticarRoutes = new AutenticarRoutes();
exports.default = autenticarRoutes.router;
