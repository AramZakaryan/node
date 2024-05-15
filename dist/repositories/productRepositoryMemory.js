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
exports._productRepository = exports.products = void 0;
const getResFunctions_1 = require("../utils/getResFunctions");
exports.products = [
    { id: 1, title: "tomato", quantity: 10 },
    { id: 2, title: "orange", quantity: 23 }
];
exports._productRepository = {
    filterProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                return exports.products.filter(p => p.title.indexOf(title) > -1).map(getResFunctions_1.getResProduct);
            }
            else {
                return exports.products.map(getResFunctions_1.getResProduct);
            }
        });
    },
    findProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = exports.products.find(p => p.title === title);
            if (product) {
                return (0, getResFunctions_1.getResProduct)(product);
            }
        });
    },
    deleteProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = exports.products.findIndex(p => p.title === title);
            if (productId > -1) {
                exports.products.splice(productId, 1);
                return true;
            }
        });
    },
    updateProduct(initialTitle, finalTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = exports.products.find(p => p.title === initialTitle);
            if (product) {
                product.title = finalTitle;
                return (0, getResFunctions_1.getResProduct)(product);
            }
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxId = exports.products.reduce((mId, p) => mId < p.id ? p.id : mId, 0);
            const product = { id: maxId + 1, title, quantity: 1 };
            exports.products.push(product);
            return (0, getResFunctions_1.getResProduct)(exports.products[exports.products.length - 1]);
        });
    }
};
