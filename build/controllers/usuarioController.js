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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const class_validator_1 = require("class-validator");
class UsuarioController {
}
_a = UsuarioController;
UsuarioController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    let users;
    try {
        users = yield userRepository.find({ select: ['id', 'username', 'role'] });
    }
    catch (e) {
        return res.status(404).json({ message: 'Not Result' });
    }
    if (users.length > 0) {
        res.send(users);
    }
    else {
        res.status(404).json({ message: 'Not Result' });
    }
});
UsuarioController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    try {
        const user = yield userRepository.findOneOrFail(id);
        res.send(user);
    }
    catch (e) {
        res.status(404).json({ mesagge: 'Not Result' });
    }
});
UsuarioController.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    const user = new user_1.User();
    user.username = username;
    user.password = password;
    user.role = role;
    //Validate
    const validationOp = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(user, validationOp);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    //TODO: HASH PASSWORD
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    try {
        user.hashPassword();
        yield userRepository.save(user);
    }
    catch (e) {
        return res.status(400).json({ message: 'Username already exist' });
    }
    //ALL OK
    res.send(user);
});
UsuarioController.editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const { id } = req.params;
    const { username, role } = req.body;
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    // Try get User
    try {
        user = yield userRepository.findOneOrFail(id);
        user.username = username;
        user.role = role;
    }
    catch (e) {
        return res.status(404).json({ message: 'User not found' });
    }
    const validationOp = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(user, validationOp);
    if (errors.length > 0) {
        return res.status(404).json(errors);
    }
    //Try to Save User
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        return res.status(409).json({ message: 'Username already in use' });
    }
    res.status(201).json({ message: 'User Update' });
});
UsuarioController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (e) {
        return res.status(404).json({ message: 'User not found' });
    }
    //Remove User
    userRepository.delete(id);
    res.status(201).json({ message: 'User deleted' });
});
exports.default = UsuarioController;
