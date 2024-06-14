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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userQueryRepository_1 = require("../repositories/userQueryRepository");
const userService_1 = require("../domain/userService");
const jwtService_1 = require("./application/jwtService");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.userRouter = (0, express_1.Router)({});
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const userId = yield jwtService_1.jwtService.getUserIdByToken(token);
        if (userId) {
            req.app.locals.userId = userId;
            next();
        }
        else {
            res.sendStatus(401);
            return;
        }
    });
}
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page;
    const count = req.query.count; // count of documents per page
    const users = yield userQueryRepository_1.userQueryRepository.filterUsers(page, count);
    users ? res.send(users) : res.sendStatus(404);
}));
exports.userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login;
    const pass = req.body.pass;
    const name = req.body.name;
    const age = req.body.age;
    const result = yield userService_1.userService.createUser(login, pass, name, age);
    result ? res.sendStatus(201) : res.sendStatus(400);
}));
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login;
    const pass = req.body.pass;
    const response = yield userService_1.userService.checkCredentials(login, pass);
    response ? res.send(response) : res.sendStatus(401);
}));
exports.userRouter.post("/me", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authResult = req.app.locals.userId;
    authResult ? res.send(authResult) : res.sendStatus(401);
}));
exports.userRouter.post("/email", (req, res) => {
    const body = req.body;
    nodemailer_1.default.createTransport();
    res.send({
        email: body.email,
        message: body.message,
        subject: body.subject
    });
});
