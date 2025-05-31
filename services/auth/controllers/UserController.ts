import UserModel from "../models/UserModel/UserModel.ts"
import type { SignInDto, ValidateTokenDto, VerifiedUserDataDto, TokenDto } from "../dto/User/index.ts"

interface IAuth {
    username: string,
    password: string
}

export const userController = {

    Queries: {
        
        validate: async (_: any, { jwt_token }: ValidateTokenDto): Promise<VerifiedUserDataDto> => {
            try {
                const user =  await UserModel.validateToken({ jwt_token }) as unknown as VerifiedUserDataDto
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
        signUp: async (_: any, { username, password }: IAuth): Promise<TokenDto | void> => {
            try {
                return await UserModel.create({ username, password })
            } catch(err: any) {

                console.log(err.message)
                throw new Error(`Ошибка при регистрации пользователя.\n${err.message}`)
            }
        },

        signIn: async (_: any, { username, password }: SignInDto): Promise<TokenDto | void> => {
            try {

                console.log(username, password)

                const jwt_token =  await UserModel.signIn({ username, password }) as unknown as TokenDto
                if (jwt_token) {
                    return jwt_token
                } else {
                    throw new Error(`Неверный логин или пароль`)
                }
            } catch (err: any) {
                throw new Error(`Ошибка аутентификации\n${err.message}`)
            }
        },
    }
}
