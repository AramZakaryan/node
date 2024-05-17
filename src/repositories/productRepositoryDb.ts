import {ProductType} from "../types";
import {getResProduct} from "../utils/getResFunctions";
import {ResProductModel} from "../models/resProductsModels";
import {productsCollection} from "./db";
import {DeleteResult, InsertOneResult, UpdateResult} from "mongodb";


export const productRepository = {
    async filterProducts(title?: string): Promise<ProductType[]> {
        return await productsCollection
            .find(title ? {title: {$regex: title}} : {})
            .toArray()
    },
    async findProduct(title: string): Promise<ProductType | null> {
        return await productsCollection
            .findOne({title})
    },
    async deleteProduct(title: string): Promise<true | undefined> {
        const result: DeleteResult = await productsCollection
            .deleteOne({title})
        if (result.deletedCount) {
            return true
        }
    },
    async updateProduct(initialTitle: string, finalTitle: string): Promise<ProductType | undefined> {

        const result: UpdateResult<ProductType> = await productsCollection
            .updateMany({title: initialTitle}, {$set: {title: finalTitle}})

        if (result.modifiedCount) {
            const product = await productsCollection
                .findOne({title: finalTitle})
            if (product) {
                return product
            }
        }
    },
    async createProduct(product: ProductType): Promise<true | undefined> {
        const result: InsertOneResult<ProductType> = await productsCollection
            .insertOne(product)
        if (result.insertedId) {
            return true
        }
    }
}
