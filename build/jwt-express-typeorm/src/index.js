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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express = __importStar(require("express"));
const bodyParser = __importStar(require("body-parser"));
const routes_1 = require("./routes");
const User_1 = require("./entity/User");
typeorm_1.createConnection().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    // register express routes from defined application routes
    routes_1.Routes.forEach(route => {
        app[route.method](route.route, (req, res, next) => {
            const result = (new route.controller)[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    // setup express app here
    // ...
    // start express server
    app.listen(3000);
    // insert new users for test
    yield connection.manager.save(connection.manager.create(User_1.User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));
    yield connection.manager.save(connection.manager.create(User_1.User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
})).catch(error => console.log(error));
