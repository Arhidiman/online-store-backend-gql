import jwt from 'jsonwebtoken'
import { User } from '../initModels.js'
import { secretKey } from "../../../jwt.js"
import type { Model } from "sequelize"
import type { JwtPayload } from "jsonwebtoken"
import type { ValidateTokenDto, VerifiedUserDataDto } from "../../dto/User/index.js"

export type TUser = {
    id: number, 
    username: string,
    password: string, 
    created_at: string,
    user_role: 'USER' | 'ADMIN',
    jwt_token: string
}


class UserModel {

    async findOne(username: string, password: string): Promise<Model<TUser> | null> {
        return await User.findOne({raw: true, where: { username, password }})
    }

    async create(username: string, password: string): Promise<Model<TUser> | null> {
        return await User.create({ username, password, user_role: 'USER'})
    }

    async validateToken({ jwt_token }: ValidateTokenDto): Promise<VerifiedUserDataDto> {
        
        const decodedPayload = jwt.verify(jwt_token, secretKey) as JwtPayload

        const { username, id } = decodedPayload
        const verifiedUser = { username, id}

        return verifiedUser
    }

}


export default new UserModel()