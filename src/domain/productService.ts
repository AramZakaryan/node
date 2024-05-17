import {ResProductModel} from "../models/resProductsModels";
import {productRepository} from "../repositories/productRepositoryDb";
import {ProductType} from "../types";
import {getResProduct} from "../utils/getResFunctions";
import {productsCollection} from "../repositories/db";
import {InsertOneResult} from "mongodb";


export const productService = {
    async filterProducts(title: string): Promise<ResProductModel[]> {
        const products: ProductType[] = await productRepository.filterProducts(title)
        return products.map(getResProduct)
    },
    async findProduct(title: string): Promise<ResProductModel | undefined> {
        const product: ProductType | null = await productRepository.findProduct(title)
        if (product) {
            return getResProduct(product)
        }

    },
    async deleteProduct(title: string): Promise<true | undefined> {
        return productRepository.deleteProduct(title)
    },
    async updateProduct(initialTitle: string, finalTitle: string): Promise<ResProductModel | undefined> {
        const product = await productRepository.updateProduct(initialTitle, finalTitle)
        if (product) {
            return getResProduct(product)
        }
    },
    async createProduct(title: string): Promise<ResProductModel | undefined> {
        const productsInitial: ProductType[] = await productRepository.filterProducts()
        const maxId = productsInitial.reduce((mId, p) => mId < p.id ? p.id : mId, 0);
        const product: ProductType = {id: maxId + 1, title, quantity: 1}
        const result: true | undefined = await productRepository.createProduct(product)
        if (result) {
            return getResProduct(product)
        }
    }
}
