"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// const port = 3000
const products = [
    { title: "tomato" },
    { title: "orange" }
];
const addresses = [
    { value: "Mira 7" },
    { value: "Ulentsi 23" },
];
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/products', (req, res) => {
    res.send(products);
});
app.get('/products/:name', (req, res) => {
    const product = products.find(p => p.title === req.params.name);
    res.send(product);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
