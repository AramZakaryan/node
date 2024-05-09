import express, {Request, Response} from 'express'

const app = express()
app.use(express.json()) // middleware for json
const port = process.env.PORT || 3000

// const port = 3000

let products = [
    {title: "tomato"},
    {title: "orange"}
]

let addresses = [
    {id: 1, value: "Mira 7"},
    {id: 2, value: "Ulentsi 23"},
]

app.get('/', (req: Request, res: Response) => {

    res.send('Hello World!')
})
app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        res.send(products.filter(p => p.title.indexOf(req.query.title as string) > -1))
    } else {
        res.send(products)
    }
})
app.get('/products/:name', (req: Request, res: Response) => {

    const product = products.find(p => p.title === req.params.name)
    product ? res.send(product) : res.send(404)

})

app.delete('/addresses/:id', (req: Request, res: Response) => {
    const addressId = addresses.findIndex(a => a.id === +req.params.id)
    if (addressId > -1) {
        addresses.splice(addressId, 1)
        res.send(204)
    } else {
        res.send(404)
    }
})

app.post('/addresses', (req, res) => {

    const maxId = addresses.reduce((mId, a) => mId < a.id ? a.id : mId, 0);

    addresses.push({id: maxId + 1, value: req.body.value})

    res
        .status(201)
        .json(addresses[addresses.length - 1])

})

app.put('/addresses/:id', (req, res) => {

    const address = addresses.find(a => a.id === +req.params.id);

    if (address) {
        address.value = req.body.value
        res
            .status(201)
            .json(address)
    } else {
        res.sendStatus(404)
    }

})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})

app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find(a => a.id === +req.params.id)
    address ? res.send(address) : res.send(404)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})
