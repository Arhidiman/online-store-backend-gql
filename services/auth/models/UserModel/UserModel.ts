import { User } from "./User.ts"
import type { Model } from "sequelize"

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

}


export default new UserModel()