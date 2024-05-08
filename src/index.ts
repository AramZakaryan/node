import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000
// const port = 3000


const products = [
    {title: "tomato"},
    {title: "orange"}
]

const addresses = [
    {value: "Mira 7"},
    {value: "Ulentsi 23"},
]

app.get('/', (req: Request, res: Response) => {

    res.send('Hello World!')
})
app.get('/products', (req: Request, res: Response) => {
    res.send(products)
})

app.get('/products/:name', (req: Request, res: Response) => {

    const product = products.find(p=>p.title===req.params.name)
    res.send(product)
})


app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)


})
