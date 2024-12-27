import UserModel from "../models/UserModel/UserModel.ts"
import type { Model } from "sequelize"
import type { UserDto } from "../dto/User/index.ts"


interface IAuth {
    username: string,
    password: string
}

export const userController = {

    signUp: async (_: any, { username, password }: IAuth): Promise<UserDto | void> => {
        try {


            return await UserModel.create({ username, password })
        } catch(err: any) {

            console.log(`Ошибка при регистрации пользователя\n${err.message}`)

        }
    },

    signIn: async (_: any, { username, password }: IAuth): Promise<Model<UserDto> | null> => {
        return await UserModel.findOne(username, password)
    }

    
}
