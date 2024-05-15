"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepositoryMemory = exports.products = void 0;
const getResFunctions_1 = require("../utils/getResFunctions");
exports.products = [
    { id: 1, title: "tomato", quantity: 10 },
    { id: 2, title: "orange", quantity: 23 }
];
exports.productRepositoryMemory = {
    filterProducts(title) {
        if (title) {
            return exports.products.filter(p => p.title.indexOf(title) > -1).map(getResFunctions_1.getResProduct);
        }
        else {
            return exports.products.map(getResFunctions_1.getResProduct);
        }
    },
    findProduct(title) {
        const product = exports.products.find(p => p.title === title);
        if (product) {
            return (0, getResFunctions_1.getResProduct)(product);
        }
    },
    deleteProduct(title) {
        const productId = exports.products.findIndex(p => p.title === title);
        if (productId > -1) {
            exports.products.splice(productId, 1);
            return true;
        }
    },
    updateProduct(initialTitle, finalTitle) {
        const product = exports.products.find(p => p.title === initialTitle);
        if (product) {
            product.title = finalTitle;
            return (0, getResFunctions_1.getResProduct)(product);
        }
    },
    createProduct(title) {
        const maxId = exports.products.reduce((mId, p) => mId < p.id ? p.id : mId, 0);
        const product = { id: maxId + 1, title, quantity: 1 };
        exports.products.push(product);
        return (0, getResFunctions_1.getResProduct)(exports.products[exports.products.length - 1]);
    }
};
