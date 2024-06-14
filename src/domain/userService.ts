import bcrypt from "bcrypt"
import {userRepository} from "../repositories/userRepository";
import {UserType} from "../types";
import {jwtService} from "../routers/application/jwtService";

export const userService = {

    async createUser(login?: string, pass?: string, name?: string, age?: number): Promise<true | undefined> {

        if (!login || !pass) return

        const passHash: string = await bcrypt.hash(pass, 10)

        const user: UserType = {
            name,
            age,
            login,
            passHash,
        }

        const result: true | undefined = await userRepository.createUser(user)

        if (result) return true

    },

    async checkCredentials(login?: string, pass?: string): Promise<string | undefined> {

        if (!login || !pass) return

        const user = await userRepository.findUser(login, pass)

        if (!user) return

        const result = await bcrypt.compare(pass, user.passHash)

        if (result) return  await jwtService.createJwt(user)


    }


}
