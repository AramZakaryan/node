import {NextFunction, Router} from "express";
import {
    ReqProductsBodyType,
    ReqProductsParamsBodyType,
    ReqProductsParamsType,
    ReqProductsQueryType
} from "../models/reqProductsModels";
import {ResProductsType, ResProductType} from "../models/resProductsModels";
import {productRepository} from "../repositories/productRepository";
import {validateBody} from "../utils/middlewares/validateBody";
import {validateBodyFailed} from "../utils/middlewares/validateBodyFailed";

export const productRouter = Router({})

productRouter.use('/:title', cigaretteMiddleware)

function cigaretteMiddleware(req: ReqProductsParamsType, res: ResProductType, next: NextFunction) {
    if (req.params.title === "cigarette") {
        res.status(403).json({title: "We are against cigarettes."})
    } else {
        next()
    }
}

productRouter.get('/', (req: ReqProductsQueryType, res: ResProductsType) => {
    const title = req.query.title
    const products = productRepository.filterProducts(title)
    res.send(products)
})

productRouter.get('/:title', (req: ReqProductsParamsType, res: ResProductType) => {
    const title = req.params.title
    const product = productRepository.findProduct(title)
    product ? res.send(product) : res.sendStatus(404)
})


productRouter.delete('/:title', (req: ReqProductsParamsType, res: ResProductType) => {
    const title = req.params.title
    const isDeleted = productRepository.deleteProduct(title)
    isDeleted ? res.sendStatus(204) : res.sendStatus(404)
})

productRouter.put('/:title',
    validateBody("title"),
    validateBodyFailed,
    (req: ReqProductsParamsBodyType, res: ResProductType) => {
        // const valResult = validationResult(req)
        // if (valResult.isEmpty()) {
        const initialTitle = req.params.title
        const finalTitle = req.body.title
        const product = productRepository.updateProduct(initialTitle, finalTitle)
        product ? res.status(201).json(product) : res.sendStatus(404)
        // } else {
        //     res.send({errors: valResult.array()})
        // }
    })

productRouter.post('/',
    validateBody("title"),
    validateBodyFailed,
    (req: ReqProductsBodyType, res: ResProductType) => {
        // const valResult = validationResult(req)
        // if (valResult.isEmpty()) {
            const title = req.body.title
            const product = productRepository.createProduct(title)
            res.status(201).json(product)
        // } else {
        //     res.send({errors: valResult.array()})
        // }
    })