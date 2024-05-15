"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBodyMiddleware = void 0;
const express_validator_1 = require("express-validator");
function verifyBodyMiddleware(key) {
    return (0, express_validator_1.body)(key)
        .notEmpty().withMessage("Shall not be empty")
        .isLength({ min: 3, max: 20 }).withMessage("length should be from 3 to 20");
}
exports.verifyBodyMiddleware = verifyBodyMiddleware;
