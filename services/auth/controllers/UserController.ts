import UserModel from "../models/UserModel/UserModel.ts"
import type { Model } from "sequelize"
import type { UserDto, SignInDto, SignUpDto, ValidateTokenDto } from "../dto/User/index.ts"


interface IAuth {
    username: string,
    password: string
}

export const userController = {

    Queries: {
        signIn: async (_: any, { username, password }: SignInDto): Promise<UserDto | void> => {
            try {
                const user =  await UserModel.findOne(username, password) as unknown as UserDto
                if (user) {
                    return user
                } else {
                    throw new Error(`Неверный логин или пароль`)
                }
            } catch (err: any) {
                throw new Error(`Ошибка аутентификации\n${err.message}`)
            }
        },
        
        validate: async (_: any, { jwt_token }: ValidateTokenDto): Promise<UserDto> => {
            try {
                const user =  await UserModel.validateToken({ jwt_token }) as unknown as UserDto
                if (user) {
                    return user
                } else {
                    throw new Error(`Пользователь не валидирован`)
                }
            } catch (err: any) {
                throw new Error(`Ошибка валидации пользователя\n${err.message}`)
            }
        }
    },


    Mutatios: {
        signUp: async (_: any, { username, password }: IAuth): Promise<UserDto | void> => {
            try {
                return await UserModel.create({ username, password })
            } catch(err: any) {
                throw new Error(`Ошибка при регистрации пользователя\n${err.message}`)
            }
        }
    }
}
