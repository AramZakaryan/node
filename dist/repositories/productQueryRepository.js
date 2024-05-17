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
exports.productQueryRepository = void 0;
const db_1 = require("./db");
const getResFunctions_1 = require("../utils/getResFunctions");
exports.productQueryRepository = {
    filterProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield db_1.productCollection
                .find(title ? { title: { $regex: title } } : {})
                .toArray();
            return products.map(getResFunctions_1.ProductMapper);
        });
    },
    findProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield db_1.productCollection
                .findOne({ title });
            if (product) {
                return (0, getResFunctions_1.ProductMapper)(product);
            }
        });
    }
};
