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
const db_1 = require("./db");
exports.productRepository = {
    deleteProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productCollection
                .deleteOne({ title });
            if (result.deletedCount) {
                return true;
            }
        });
    },
    updateProduct(initialTitle, finalTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productCollection
                .updateMany({ title: initialTitle }, { $set: { title: finalTitle } });
            if (result.modifiedCount) {
                const product = yield db_1.productCollection
                    .findOne({ title: finalTitle });
                if (product) {
                    return product;
                }
            }
        });
    },
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productCollection
                .insertOne(product);
            if (result.insertedId) {
                return true;
            }
        });
    }
};
