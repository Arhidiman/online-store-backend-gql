import UserModel from "../models/UserModel/UserModel.ts"
import type { Model } from "sequelize"
import type { TUser } from "../models/UserModel/UserModel.ts"


interface IAuth {
    username: string,
    password: string
}

export const userController = {
    auth: async (_: any, { username, password }: IAuth): Promise<Model<TUser> | null> => {
        return await UserModel.findOne(username, password)
    },

    signIn: async (_: any, { username, password }: IAuth): Promise<Model<TUser> | null | undefined> => {
        try {
            return await UserModel.create(username, password)

        } catch(err: any) {

            console.log(`Ошибка при регистрации пользователя\n${err.message}`)

        }
    }

}