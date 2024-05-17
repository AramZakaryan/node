import {ProductType} from "../types";
import {productCollection} from "./db";
import {ResProductModel} from "../models/resProductsModels";
import {productRepository} from "./productRepositoryDb";
import {ProductMapper} from "../utils/getResFunctions";

export const productQueryRepository = {
    async filterProducts(title?: string): Promise<ResProductModel[]> {
        const products: ProductType[] = await productCollection
            .find(title ? {title: {$regex: title}} : {})
            .toArray()
        return products.map(ProductMapper)
    },
    async findProduct(title: string): Promise<ResProductModel | undefined> {
        const product: ProductType | null = await productCollection
            .findOne({title})
        if (product) {
            return ProductMapper(product)
        }
    }
}
