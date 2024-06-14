import {RequestHandler, Request, Response, NextFunction, Router} from "express";
import {userQueryRepository} from "../repositories/userQueryRepository";
import {userService} from "../domain/userService";
import {jwtService} from "./application/jwtService";
import {ObjectId} from "mongodb";
import nodemailer from "nodemailer"

export const userRouter = Router({})

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]
    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.app.locals.userId = userId
        next()
    } else {
        res.sendStatus(401)
        return
    }
}

userRouter.get("/", async (req, res) => {
    const page = req.query.page as string | undefined
    const count = req.query.count as string | undefined // count of documents per page
    const users = await userQueryRepository.filterUsers(page, count)
    users ? res.send(users) : res.sendStatus(404)
})

userRouter.post("/", async (req, res) => {

    const login = req.body.login
    const pass = req.body.pass
    const name = req.body.name
    const age = req.body.age

    const result: true | undefined = await userService.createUser(login, pass, name, age)

    result ? res.sendStatus(201) : res.sendStatus(400)

})

userRouter.post("/login", async (req, res) => {

    const login = req.body.login
    const pass = req.body.pass

    const response = await userService.checkCredentials(login, pass)

    response ? res.send(response) : res.sendStatus(401)
})

userRouter.post("/me", authMiddleware, async (req: Request, res) => {
    const authResult = req.app.locals.userId
    authResult ? res.send(authResult) : res.sendStatus(401)
})

userRouter.post("/email", (req, res) => {
    const body = req.body
    nodemailer.createTransport()

    res.send({
        email: body.email,
        message: body.message,
        subject: body.subject
    })
})





