import {ProductType} from "../types";
import {productCollection} from "./db";
import {DeleteResult, InsertOneResult, UpdateResult} from "mongodb";

export const productRepository = {
    async deleteProduct(title: string): Promise<true | undefined> {
        const result: DeleteResult = await productCollection
            .deleteOne({title})
        if (result.deletedCount) {
            return true
        }
    },
    async updateProduct(initialTitle: string, finalTitle: string): Promise<ProductType | undefined> {
        const result: UpdateResult<ProductType> = await productCollection
            .updateMany({title: initialTitle}, {$set: {title: finalTitle}})
        if (result.modifiedCount) {
            const product = await productCollection
                .findOne({title: finalTitle})
            if (product) {
                return product
            }
        }
    },
    async createProduct(product: ProductType): Promise<true | undefined> {
        const result: InsertOneResult<ProductType> = await productCollection
            .insertOne(product)
        if (result.insertedId) {
            return true
        }
    }
}
