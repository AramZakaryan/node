"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const productRouter_1 = require("./routers/productRouter");
const addressRouter_1 = require("./routers/addressRouter");
const userRouter_1 = require("./routers/userRouter");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json()); // middleware for json
exports.app.get('/', (req, res) => {
    const start = performance.now();
    // while(performance.now()-start<1500){}
    res.send('Hello World!');
});
exports.app.use('/products', productRouter_1.productRouter);
exports.app.use('/addresses', addressRouter_1.addressRouter);
exports.app.use("/users", userRouter_1.userRouter);
