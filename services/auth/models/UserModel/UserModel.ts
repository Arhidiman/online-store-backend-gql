import jwt from 'jsonwebtoken'
import { secretKey } from "../../jwt.ts"
import { User } from "./User.ts"
import type { Model } from "sequelize"
import type { UserDto } from "../../dto/User/index.ts"

class UserModel {

    async findOne(username: string, password: string): Promise<Model<UserDto> | null> {
        return await User.findOne({raw: true, where: { username, password }})
    }

    async create({ username, password}: {username: string, password: string}): Promise<UserDto> {

        const userData = await User.create({ username, password, user_role: 'USER'})

        const user = userData && userData.dataValues 
        const { id, username: name } = user || {}

        const token = jwt.sign({ id, name }, secretKey)

        await User.update({ jwt_token: token }, { where: { id } }) as unknown as UserDto
        const userWithJWT = await User.findOne({ where: { id, jwt_token: token }}) as unknown as UserDto

        return userWithJWT
    }

}


export default new UserModel()
