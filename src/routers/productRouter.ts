import {NextFunction, Router} from "express";
import {
    ReqProductsBodyType,
    ReqProductsParamsBodyType,
    ReqProductsParamsType,
    ReqProductsQueryType
} from "../models/reqProductsModels";
import {ResProductsType, ResProductType} from "../models/resProductsModels";
import {productRepository} from "../repositories/productRepositoryDb";
import {validateBody} from "../utils/middlewares/validateBody";
import {validateBodyFailed} from "../utils/middlewares/validateBodyFailed";
import {productService} from "../domain/productService";
import {productQueryRepository} from "../repositories/productQueryRepository";

export const productRouter = Router({})

productRouter.use('/:title', cigaretteMiddleware)

function cigaretteMiddleware(req: ReqProductsParamsType, res: ResProductType, next: NextFunction) {
    if (req.params.title === "cigarette") {
        res.status(403).json({title: "We are against cigarettes."})
    } else {
        next()
    }
}

productRouter.get('/', async (req: ReqProductsQueryType, res: ResProductsType) => {
    const title = req.query.title
    const products = await productQueryRepository.filterProducts(title)
    res.send(products)
})

productRouter.get('/:title', async (req: ReqProductsParamsType, res: ResProductType) => {
    const title = req.params.title
    const product = await productQueryRepository.findProduct(title)
    product ? res.send(product) : res.sendStatus(404)
})


productRouter.delete('/:title', async (req: ReqProductsParamsType, res: ResProductType) => {
    const title = req.params.title
    const isDeleted = await productService.deleteProduct(title)
    isDeleted ? res.sendStatus(204) : res.sendStatus(404)
})

productRouter.put('/:title',
    validateBody("title"),
    validateBodyFailed,
    async (req: ReqProductsParamsBodyType, res: ResProductType) => {
        const initialTitle = req.params.title
        const finalTitle = req.body.title
        const product = await productService.updateProduct(initialTitle, finalTitle)
        product ? res.status(201).json(product) : res.sendStatus(404)
    })

productRouter.post('/',
    validateBody("title"),
    validateBodyFailed,
    async (req: ReqProductsBodyType, res: ResProductType) => {
        const title = req.body.title
        const product = await productService.createProduct(title)
        product ? res.status(201).json(product) : res.sendStatus(400)
    })