import jwt, {JwtPayload} from "jsonwebtoken"
import {UserDbType} from "../../types";
import {ObjectId} from "mongodb";
import {JwtSecret} from "../../settings";


export const jwtService = {
    async createJwt(user: UserDbType): Promise<string> {
        debugger
        return jwt.sign({userId: user._id}, JwtSecret, {expiresIn: "1d"})
    },

    async getUserIdByToken(token: string | undefined): Promise<ObjectId | null> {
        if (!token) return null
        try {
            const response = jwt.verify(token, JwtSecret) as { userId: string }
            return new ObjectId(response.userId)
        } catch (err) {
            return null
        }
    }
}