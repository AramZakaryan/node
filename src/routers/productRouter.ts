import {Router} from "express";
import {
    ReqProductsBodyType,
    ReqProductsParamsBodyType,
    ReqProductsParamsType,
    ReqProductsQueryType
} from "../models/reqProductsModels";
import {ResProductsType, ResProductType} from "../models/resProductsModels";
import {productRepository} from "../repositories/productRepository";

export const productRouter = Router({})

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

productRouter.put('/:title', (req: ReqProductsParamsBodyType, res: ResProductType) => {
    const initialTitle = req.params.title
    const finalTitle = req.body.title
    const product = productRepository.updateProduct(initialTitle, finalTitle)
    product ? res.status(201).json(product) : res.sendStatus(404)
})

productRouter.post('/', (req: ReqProductsBodyType, res: ResProductType) => {
    const title = req.body.title
    const product = productRepository.createProduct(title)
    res.status(201).json(product)
})