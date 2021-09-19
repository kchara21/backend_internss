"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pasante = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Pasante = class Pasante {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pasante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(4, 30),
    __metadata("design:type", String)
], Pasante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(10),
    __metadata("design:type", String)
], Pasante.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], Pasante.prototype, "ingresoPracticas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Pasante.prototype, "egresoPracticas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], Pasante.prototype, "ingresoViamatica", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "lider", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Pasante.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "celular", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pasante.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "semestre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pasante.prototype, "sector", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pasante.prototype, "avance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pasante.prototype, "disponibilidad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pasante.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "almuerzo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pasante.prototype, "tecnologia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "universidad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "carrera", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "tipoPasantias", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Pasante.prototype, "proyecto", void 0);
Pasante = __decorate([
    (0, typeorm_1.Entity)()
], Pasante);
exports.Pasante = Pasante;
