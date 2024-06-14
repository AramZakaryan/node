"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtSecret = exports.mongoUri = void 0;
exports.mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";
exports.JwtSecret = process.env.secretJWT || "123";
