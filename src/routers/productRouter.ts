import {Router} from "express";
import {ReqProductsParamsType, ReqProductsQueryType} from "../models/reqProductsModels";
import {ResProductsType, ResProductType} from "../models/resProductsModels";
import {products} from "../db/db";

import {getResProduct} from "../utils/getResFunctions";

export const productRouter = Router({})

productRouter.get('/',
    (req: ReqProductsQueryType,
     res: ResProductsType) => {
        if (req.query.title) {
            res.send(products.filter(p => p.title.indexOf(req.query.title) > -1).map(getResProduct))
        } else {
            res.send(products.map(getResProduct))
        }
    })
productRouter.get('/:name',
    (req: ReqProductsParamsType,
     res: ResProductType) => {
        const product = products.find(p => p.title === req.params.name)
        product ? res.send(getResProduct(product)) : res.sendStatus(404)
    })
