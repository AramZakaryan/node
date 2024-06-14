import {userCollection} from "./db";
import {UserDbType, UserType} from "../types";

export const userRepository = {
    async createUser(user: UserType): Promise<true | undefined> {
        const result = await userCollection.insertOne(user as UserDbType)
        if (result.insertedId) return true
    },
    async findUser(login: string, pass: string): Promise<UserDbType | null> {
        return await userCollection.findOne({login})
    }
}