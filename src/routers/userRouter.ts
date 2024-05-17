import {Router} from "express";
import {userQueryRepository} from "../repositories/userQueryRepository";

export const userRouter = Router({})

userRouter.get("/", async (req, res) => {
    const users = await userQueryRepository.filterUsers()
    users ? res.send(users) : res.sendStatus(404)
})