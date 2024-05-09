"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware for json
const port = process.env.PORT || 3000;
// const port = 3000
let products = [
    { title: "tomato" },
    { title: "orange" }
];
let addresses = [
    { id: 1, value: "Mira 7" },
    { id: 2, value: "Ulentsi 23" },
];
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/products', (req, res) => {
    if (req.query.title) {
        res.send(products.filter(p => p.title.indexOf(req.query.title) > -1));
    }
    else {
        res.send(products);
    }
});
app.get('/products/:name', (req, res) => {
    const product = products.find(p => p.title === req.params.name);
    product ? res.send(product) : res.send(404);
});
app.delete('/addresses/:id', (req, res) => {
    const addressId = addresses.findIndex(a => a.id === +req.params.id);
    if (addressId > -1) {
        addresses.splice(addressId, 1);
        res.send(204);
    }
    else {
        res.send(404);
    }
});
app.post('/addresses', (req, res) => {
    const maxId = addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);
    addresses.push({ id: maxId + 1, value: req.body.value });
    res
        .status(201)
        .json(addresses[addresses.length - 1]);
});
app.put('/addresses/:id', (req, res) => {
    const address = addresses.find(a => a.id === +req.params.id);
    if (address) {
        address.value = req.body.value;
        res
            .status(201)
            .json(address);
    }
    else {
        res.sendStatus(404);
    }
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    const address = addresses.find(a => a.id === +req.params.id);
    address ? res.send(address) : res.send(404);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
