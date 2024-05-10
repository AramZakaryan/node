import express, {Request, Response} from "express";
import {productRouter} from "./routers/productRouter";
import {addressRouter} from "./routers/addressRouter";

export const app = express()
app.use(express.json()) // middleware for json

app.get('/', (req: Request, res: Response<string>) => {
    res.send('Hello World!')
})

app.use('/products', productRouter)

app.use('/addresses', addressRouter)



