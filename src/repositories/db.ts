import {MongoClient} from "mongodb";


const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"


export const client = new MongoClient(mongoUri)

export async function runDb() {
    try {
        await client.connect()
        await client.db("admin").command({ping: 1})
        console.log("Successful connection to MongoDB ")
    } catch {
        console.log("Cannot connect to MongoDB ")
        await client.close()
    }
}