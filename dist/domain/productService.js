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
exports.productService = void 0;
const productRepositoryDb_1 = require("../repositories/productRepositoryDb");
const getResFunctions_1 = require("../utils/getResFunctions");
exports.productService = {
    filterProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productRepositoryDb_1.productRepository.filterProducts(title);
            return products.map(getResFunctions_1.getResProduct);
        });
    },
    findProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productRepositoryDb_1.productRepository.findProduct(title);
            if (product) {
                return (0, getResFunctions_1.getResProduct)(product);
            }
        });
    },
    deleteProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return productRepositoryDb_1.productRepository.deleteProduct(title);
        });
    },
    updateProduct(initialTitle, finalTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productRepositoryDb_1.productRepository.updateProduct(initialTitle, finalTitle);
            if (product) {
                return (0, getResFunctions_1.getResProduct)(product);
            }
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsInitial = yield productRepositoryDb_1.productRepository.filterProducts();
            const maxId = productsInitial.reduce((mId, p) => mId < p.id ? p.id : mId, 0);
            const product = { id: maxId + 1, title, quantity: 1 };
            const result = yield productRepositoryDb_1.productRepository.createProduct(product);
            if (result) {
                return (0, getResFunctions_1.getResProduct)(product);
            }
        });
    }
};
