import request from "supertest"
import {ReqAddressesBodyModel} from "../src/models/reqAddressesModels";
import {ResAddressesType, ResAddressModel, ResAddressType} from "../src/models/resAddressesModels";
import {app} from "../src/app";


describe("/api",  () => {
    it("All products should be received correctly", async () => {
        await request(app)
            .get('/products')
            .expect(200, [
                {title: "tomato"},
                {title: "orange"}
            ])
    })


    it("Products containing letter 'o' should be received correctly", async () => {
        await request(app)
            .get('/products')
            .query({title: "o"})
            .expect(200, [
                {title: "tomato"},
                {title: "orange"}
            ])
    })

    it("Product containing letter 't' should be received correctly", async () => {
        await request(app)
            .get('/products')
            .query({title: "t"})
            .expect(200, [
                {title: "tomato"}
            ])
    })

    it("Product with name 'orange' should be received correctly", async () => {
        await request(app)
            .get('/products/orange')
            .expect(200,
                {title: "orange"}
            )
    })


    it("Should return 404 for not existing product", async () => {
        await request(app)
            .get('/products/cucumber')
            .expect(404)
    })

    it("All addresses should be received correctly", async () => {
        await request(app)
            .get('/addresses')
            .expect(200, [
                {id: 1, value: "Mira 7"},
                {id: 2, value: "Ulentsi 23"},
            ])
    })

    it("Address with id 2 should be received correctly", async () => {
        await request(app)
            .get('/addresses/2')
            .expect(200,
                {id: 2, value: "Ulentsi 23"}
            )
    })

    it("Should return 404 for not existing address in case of get", async () => {
        await request(app)
            .get('/addresses/222')
            .expect(404)
    })

    it("Address should be deleted correctly", async () => {
        const initialAddresses = await request(app).get('/addresses')

        await request(app)
            .delete('/addresses/2')
            .expect(204)

        const finalAddress = await request(app).get('/addresses')
        expect(finalAddress.body.length).toBe(initialAddresses.body.length - 1)
    })

    it("Should return 404 for not existing address in case of delete", async () => {

        await request(app)
            .delete('/addresses/222')
            .expect(404)

    })


    it("Address value should be updated correctly", async () => {

        const reqAddressBody: ReqAddressesBodyModel = {value: "Some Address 333"}
        const resAddress: ResAddressModel = {...reqAddressBody, id: 1}

        // sub-test 1
        await request(app)
            .put('/addresses/1')
            .send(reqAddressBody)
            .expect(resAddress)

        // sub-test 2
        const resAddressGet = await request(app).get('/addresses/1')
        expect(resAddressGet.body).toEqual(resAddress)
    })

    it("Should return 404 for not existing address in case of put", async () => {

        await request(app)
            .put('/addresses/222')
            .expect(404)

    })


    it("Should create new address", async () => {

        const initialState: ResAddressModel[] = await request(app).get('/addresses').then(res => res.body)
        const maxId = initialState.reduce((mId, a) => mId < a.id ? a.id : mId, 0);

        const reqAddressBody: ReqAddressesBodyModel = {value: "Some Street 100"}
        const resAddress: ResAddressModel = {...reqAddressBody, id: maxId + 1}


        await request(app)
            .post('/addresses')
            .send(reqAddressBody)
            .expect(201,
                resAddress)

        const finalState:ResAddressModel[] = await request(app).get('/addresses').then(res=>res.body)
        expect(finalState.length).toBe(initialState.length + 1)

    })
})