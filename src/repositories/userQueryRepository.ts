import {userCollection} from "./db";
import {UserType} from "../types";


export const userQueryRepository = {
    async filterUsers(page?: string, count?: string) {

        const pageNum = page ? +page : 1
        const countNum = count ? +count : page ? 1 : 0
        const skipNum = (pageNum - 1) * countNum

        const users = await userCollection.find({})
            // .sort({name: 1})
            .skip(skipNum)
            .limit(countNum)
            .toArray()
        if (users) {
            return users.map(u => ({
                name: u.name,
                age: u.age
            }))
        }
        return users
    }
}