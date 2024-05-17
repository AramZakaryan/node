import {userCollection} from "./db";
import {UserType} from "../types";


export const userQueryRepository = {
    async filterUsers() {
        const users: UserType[] = await userCollection.find({}).sort({name:1,"age":-1}).toArray()
        if (users) {
            return users.map(u => ({
                name: u.name,
                age: u.age
            }))
        }
    }
}