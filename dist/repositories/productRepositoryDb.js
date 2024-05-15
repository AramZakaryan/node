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
exports.productRepository = void 0;
const getResFunctions_1 = require("../utils/getResFunctions");
const db_1 = require("./db");
exports.productRepository = {
    filterProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield db_1.productsCollection
                .find(title ? { title: { $regex: title } } : {})
                .toArray();
            return products.map(getResFunctions_1.getResProduct);
        });
    },
    findProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield db_1.productsCollection
                .findOne({ title });
            if (product) {
                return (0, getResFunctions_1.getResProduct)(product);
            }
        });
    },
    deleteProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productsCollection
                .deleteOne({ title });
            if (result.deletedCount) {
                return true;
            }
        });
    },
    updateProduct(initialTitle, finalTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productsCollection
                .updateMany({ title: initialTitle }, { $set: { title: finalTitle } });
            if (result.modifiedCount) {
                const product = yield db_1.productsCollection
                    .findOne({ title: finalTitle });
                if (product) {
                    return (0, getResFunctions_1.getResProduct)(product);
                }
            }
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsInitial = yield db_1.productsCollection
                .find({})
                .toArray();
            const maxId = productsInitial.reduce((mId, p) => mId < p.id ? p.id : mId, 0);
            // const maxId = _products.reduce((mId, p) => mId < p.id ? p.id : mId, 0);
            const product = { id: maxId + 1, title, quantity: 1 };
            const result = yield db_1.productsCollection
                .insertOne(product);
            // _products.push(product)
            const productAdded = yield db_1.productsCollection
                .findOne({ id: maxId + 1 });
            if (productAdded) {
                return (0, getResFunctions_1.getResProduct)(productAdded);
            }
        });
    }
};
