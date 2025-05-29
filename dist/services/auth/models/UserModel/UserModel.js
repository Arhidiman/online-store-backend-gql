import jwt from 'jsonwebtoken';
import { secretKey } from "../../../jwt.js";
import { User } from "./User.js";
class UserModel {
    async findOne(username, password) {
        return await User.findOne({ raw: true, where: { username, password } });
    }
    async create({ username, password }) {
        const userData = await User.create({ username, password, user_role: 'USER' });
        const user = userData && userData.dataValues;
        const { id, username: name } = user || {};
        const token = jwt.sign({ id, username: name }, secretKey);
        await User.update({ jwt_token: token }, { where: { id } });
        return { jwt_token: token };
    }
    async signIn({ username, password }) {
        const user = await User.findOne({ where: { username, password } });
        if (user) {
            const { id, username: name } = user || {};
            const token = jwt.sign({ id, username: name }, secretKey);
            await User.update({ jwt_token: token }, { where: { id } });
            return { jwt_token: token };
        }
    }
    async validateToken({ jwt_token }) {
        const decodedPayload = jwt.verify(jwt_token, secretKey);
        const { username, id } = decodedPayload;
        const verifiedUser = { username, id };
        return verifiedUser;
    }
}
export default new UserModel();
