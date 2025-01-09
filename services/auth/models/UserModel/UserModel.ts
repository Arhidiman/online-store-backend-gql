import jwt from 'jsonwebtoken'
import { secretKey } from "../../jwt.ts"
import { User } from "./User.ts"
import type { Model } from "sequelize"
import type { UserDto, ValidateTokenDto, VerifiedUserDataDto, TokenDto } from "../../dto/User/index.ts"
import type { JwtPayload } from 'jsonwebtoken'


class UserModel {

    async findOne(username: string, password: string): Promise<Model<UserDto> | null> {
        return await User.findOne({raw: true, where: { username, password }})
    }

    async create({ username, password}: {username: string, password: string}): Promise<TokenDto> {

        const userData = await User.create({ username, password, user_role: 'USER'})

        const user = userData && userData.dataValues 
        const { id, username: name } = user || {}

        const token = jwt.sign({ id, username: name }, secretKey)

        await User.update({ jwt_token: token }, { where: { id } }) as unknown as TokenDto

        return { jwt_token: token }
    }

    async signIn({ username, password }: {username: string, password: string}): Promise<TokenDto | void> {

        const user = await User.findOne({ where: { username, password } }) as unknown as UserDto

        if (user) {

            const { id, username: name } = user || {}
            const token = jwt.sign({ id, username: name }, secretKey)
            await User.update({ jwt_token: token }, { where: { id } }) as unknown as UserDto

            return { jwt_token: token }


        }
    }

    async validateToken({ jwt_token }: ValidateTokenDto): Promise<VerifiedUserDataDto> {
        
        const decodedPayload = jwt.verify(jwt_token, secretKey) as JwtPayload
        const { username, id } = decodedPayload
        const verifiedUser = { username, id}

        return verifiedUser
    }
}


export default new UserModel()
