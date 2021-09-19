"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const config_1 = __importDefault(require("../config/config"));
const jwt = __importStar(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
class AuthController {
}
_a = AuthController;
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).json({ message: 'Username and Password are required!' });
    }
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    let user;
    try {
        user = yield userRepository.findOneOrFail({ where: { username } });
    }
    catch (e) {
        return res.status(400).json({ message: 'Username or Password incorrect' });
    }
    //Check password
    if (!user.checkPassword(password)) {
        return res.status(400).json({ message: 'Username or Password are incorrect!' });
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, config_1.default.jwtSecret, { expiresIn: '1h' });
    res.json({ message: 'OK', token, userId: user.id, role: user.role });
});
AuthController.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).json({ message: 'Old Password and New Password are required' });
    }
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    let user;
    try {
        user = yield userRepository.findOneOrFail(userId);
    }
    catch (e) {
        return res.status(400).json({ message: 'Something goes wrong!' });
    }
    if (!user.checkPassword(oldPassword)) {
        return res.status(401).json({ message: 'Check your old Password' });
    }
    user.password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(user, validationOps);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    //HAS PASSWORD
    user.hashPassword();
    userRepository.save(user);
    res.json({ message: 'Password Change!' });
});
exports.default = AuthController;
