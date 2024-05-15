import {body} from "express-validator";

export function validateBody(key: string) {
    return body(key)
        .notEmpty().withMessage("Shall not be empty")
        .isLength({min: 3, max: 20}).withMessage("length should be from 3 to 20")
}