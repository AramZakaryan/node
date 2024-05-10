"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const getResFunctions_1 = require("../utils/getResFunctions");
exports.productRouter = (0, express_1.Router)({});
exports.productRouter.get('/', (req, res) => {
    if (req.query.title) {
        res.send(db_1.products.filter(p => p.title.indexOf(req.query.title) > -1).map(getResFunctions_1.getResProduct));
    }
    else {
        res.send(db_1.products.map(getResFunctions_1.getResProduct));
    }
});
exports.productRouter.get('/:name', (req, res) => {
    const product = db_1.products.find(p => p.title === req.params.name);
    product ? res.send((0, getResFunctions_1.getResProduct)(product)) : res.sendStatus(404);
});
