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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/userRepository");
const jwtService_1 = require("../routers/application/jwtService");
exports.userService = {
    createUser(login, pass, name, age) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!login || !pass)
                return;
            const passHash = yield bcrypt_1.default.hash(pass, 10);
            const user = {
                name,
                age,
                login,
                passHash,
            };
            const result = yield userRepository_1.userRepository.createUser(user);
            if (result)
                return true;
        });
    },
    checkCredentials(login, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!login || !pass)
                return;
            const user = yield userRepository_1.userRepository.findUser(login, pass);
            if (!user)
                return;
            const result = yield bcrypt_1.default.compare(pass, user.passHash);
            if (result)
                return yield jwtService_1.jwtService.createJwt(user);
        });
    }
};
