import {ProductType} from "../types";
import {getResProduct} from "../utils/getResFunctions";
import {ResProductModel} from "../models/resProductsModels";
import {productsCollection} from "./db";
import {DeleteResult, InsertOneResult, UpdateResult} from "mongodb";


export const productRepository = {
    async filterProducts(title: string): Promise<ResProductModel[]> {
        const products: ProductType[] = await productsCollection
            .find(title ? {title: {$regex: title}} : {})
            .toArray()
        return products.map(getResProduct)
    },
    async findProduct(title: string): Promise<ResProductModel | undefined> {
        const product: ProductType | null = await productsCollection
            .findOne({title})
        if (product) {
            return getResProduct(product)
        }
    },
    async deleteProduct(title: string): Promise<true | undefined> {

        const result: DeleteResult = await productsCollection
            .deleteOne({title})

        if (result.deletedCount) {
            return true
        }

    },
    async updateProduct(initialTitle: string, finalTitle: string): Promise<ResProductModel | undefined> {

        const result: UpdateResult<ProductType> = await productsCollection
            .updateMany({title: initialTitle}, {$set: {title: finalTitle}})

        if (result.modifiedCount) {
            const product = await productsCollection
                .findOne({title: finalTitle})
            if (product) {
                return getResProduct(product)
            }
        }
    },
    async createProduct(title: string): Promise<ResProductModel | undefined> {

        const productsInitial = await productsCollection
            .find({})
            .toArray()

        const maxId = productsInitial.reduce((mId, p) => mId < p.id ? p.id : mId, 0);
        // const maxId = _products.reduce((mId, p) => mId < p.id ? p.id : mId, 0);

        const product: ProductType = {id: maxId + 1, title, quantity: 1}

        const result: InsertOneResult<ProductType> = await productsCollection
            .insertOne(product)
        // _products.push(product)

        const productAdded = await productsCollection
            .findOne({id: maxId + 1})

        if (productAdded) {
            return getResProduct(productAdded)
        }
    }
}
