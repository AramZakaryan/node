"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const express_validator_1 = require("express-validator");
function validateBody(key) {
    return (0, express_validator_1.body)(key)
        .notEmpty().withMessage("Shall not be empty")
        .isLength({ min: 3, max: 20 }).withMessage("length should be from 3 to 20");
}
exports.validateBody = validateBody;
