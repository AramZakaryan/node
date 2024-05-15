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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productRepositoryDb_1 = require("../repositories/productRepositoryDb");
const validateBody_1 = require("../utils/middlewares/validateBody");
const validateBodyFailed_1 = require("../utils/middlewares/validateBodyFailed");
exports.productRouter = (0, express_1.Router)({});
exports.productRouter.use('/:title', cigaretteMiddleware);
function cigaretteMiddleware(req, res, next) {
    if (req.params.title === "cigarette") {
        res.status(403).json({ title: "We are against cigarettes." });
    }
    else {
        next();
    }
}
exports.productRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.query.title;
    const products = yield productRepositoryDb_1.productRepository.filterProducts(title);
    res.send(products);
}));
exports.productRouter.get('/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.title;
    const product = yield productRepositoryDb_1.productRepository.findProduct(title);
    product ? res.send(product) : res.sendStatus(404);
}));
exports.productRouter.delete('/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.title;
    const isDeleted = yield productRepositoryDb_1.productRepository.deleteProduct(title);
    isDeleted ? res.sendStatus(204) : res.sendStatus(404);
}));
exports.productRouter.put('/:title', (0, validateBody_1.validateBody)("title"), validateBodyFailed_1.validateBodyFailed, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const initialTitle = req.params.title;
    const finalTitle = req.body.title;
    const product = yield productRepositoryDb_1.productRepository.updateProduct(initialTitle, finalTitle);
    product ? res.status(201).json(product) : res.sendStatus(404);
}));
exports.productRouter.post('/', (0, validateBody_1.validateBody)("title"), validateBodyFailed_1.validateBodyFailed, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const product = yield productRepositoryDb_1.productRepository.createProduct(title);
    product ? res.status(201).json(product) : res.sendStatus(400);
}));
