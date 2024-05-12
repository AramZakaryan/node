import {ProductType} from "../types";
import {getResProduct} from "../utils/getResFunctions";

export let products: ProductType[] = [
    {id: 1, title: "tomato", quantity: 10},
    {id: 2, title: "orange", quantity: 23}
]
export const productRepository = {
    filterProducts(title: string) {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1).map(getResProduct)
        } else {
            return products.map(getResProduct)
        }
    },
    findProduct(title: string) {
        const product = products.find(p => p.title === title)
        if (product) {
            return getResProduct(product)
        }
    },
    deleteProduct(title: string){
        const productId = products.findIndex(p => p.title === title)
        if (productId > -1) {
            products.splice(productId, 1)
            return true
        }
    },
    updateProduct(initialTitle: string, finalTitle: string) {
        const product = products.find(p => p.title === initialTitle);
        if (product) {
            product.title = finalTitle
            return getResProduct(product)
        }
    },
    createProduct(title: string) {
        const maxId = products.reduce((mId, p) => mId < p.id ? p.id : mId, 0);
        const product: ProductType = {id: maxId + 1, title, quantity: 1}
        products.push(product)
        return getResProduct(products[products.length - 1])
    }
}
