import {ResProductType} from "../../models/resProductsModels";
import {Response, NextFunction, Request} from "express";
import {validationResult} from "express-validator";

export function validateBodyFailed(req: any, res: any, next: NextFunction) {
    const valResult = validationResult(req)
    if (!valResult.isEmpty()) {
        res.send({errors: valResult.array()})
    } else {
        next()
    }
}