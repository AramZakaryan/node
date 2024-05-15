"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBodyFailed = void 0;
const express_validator_1 = require("express-validator");
function validateBodyFailed(req, res, next) {
    const valResult = (0, express_validator_1.validationResult)(req);
    if (!valResult.isEmpty()) {
        res.send({ errors: valResult.array() });
    }
    else {
        next();
    }
}
exports.validateBodyFailed = validateBodyFailed;
