import express, {Request, Response} from "express";
import {productRouter} from "./routers/productRouter";
import {addressRouter} from "./routers/addressRouter";
import {userRouter} from "./routers/userRouter";

export const app = express()
app.use(express.json()) // middleware for json

app.get('/', (req: Request, res: Response<string>) => {
    const start = performance.now()
    // while(performance.now()-start<1500){}
    res.send('Hello World!')
})

app.use('/products', productRouter)

app.use('/addresses', addressRouter)

app.use("/users", userRouter)



