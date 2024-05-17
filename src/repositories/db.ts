import {MongoClient} from "mongodb";
import {ProductType, UserType} from "../types";


const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"


const client = new MongoClient(mongoUri)

const db = client.db("shop")

export const productCollection = db.collection<ProductType>("products")
export const userCollection = db.collection<UserType>("users")

export async function runDb() {

    try {
        await client.connect()
        await client.db("shop").command({ping: 1})
        console.log("Successful connection to MongoDB ")
    } catch {
        console.log("Cannot connect to MongoDB ")
        await client.close()
    }

}