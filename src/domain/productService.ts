import {ResProductModel} from "../models/resProductsModels";
import {productRepository} from "../repositories/productRepositoryDb";
import {ProductType} from "../types";
import {ProductMapper} from "../utils/getResFunctions";
import {productCollection} from "../repositories/db";
import {InsertOneResult} from "mongodb";
import {productQueryRepository} from "../repositories/productQueryRepository";


export const productService = {
    async deleteProduct(title: string): Promise<true | undefined> {
        return productRepository.deleteProduct(title)
    },
    async updateProduct(initialTitle: string, finalTitle: string): Promise<ResProductModel | undefined> {
        const product = await productRepository.updateProduct(initialTitle, finalTitle)
        if (product) {
            return ProductMapper(product)
        }
    },
    async createProduct(title: string): Promise<ResProductModel | undefined> {
        const product: ProductType = {id: new Date().getTime(), title, quantity: 1}
        const result: true | undefined = await productRepository.createProduct(product)
        if (result) {
            return ProductMapper(product)
        }
    }
}
