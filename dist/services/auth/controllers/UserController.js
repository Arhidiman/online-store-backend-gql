import UserModel from "../models/UserModel/UserModel.js";
export const userController = {
    Queries: {
        validate: async (_, { jwt_token }) => {
            try {
                const user = await UserModel.validateToken({ jwt_token });
                if (user) {
                    return user;
                }
                else {
                    throw new Error(`Пользователь не валидирован`);
                }
            }
            catch (err) {
                throw new Error(`Ошибка валидации пользователя\n${err.message}`);
            }
        }
    },
    Mutatios: {
        signUp: async (_, { username, password }) => {
            try {
                return await UserModel.create({ username, password });
            }
            catch (err) {
                throw new Error(`Ошибка при регистрации пользователя\n${err.message}`);
            }
        },
        signIn: async (_, { username, password }) => {
            try {
                console.log(username, password);
                const jwt_token = await UserModel.signIn({ username, password });
                if (jwt_token) {
                    return jwt_token;
                }
                else {
                    throw new Error(`Неверный логин или пароль`);
                }
            }
            catch (err) {
                throw new Error(`Ошибка аутентификации\n${err.message}`);
            }
        },
    }
};
