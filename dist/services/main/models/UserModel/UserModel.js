import jwt from 'jsonwebtoken';
import { User } from '../initModels.js';
import { secretKey } from "../../../jwt.js";
class UserModel {
    async findOne(username, password) {
        return await User.findOne({ raw: true, where: { username, password } });
    }
    async create(username, password) {
        return await User.create({ username, password, user_role: 'USER' });
    }
    async validateToken({ jwt_token }) {
        const decodedPayload = jwt.verify(jwt_token, secretKey);
        const { username, id } = decodedPayload;
        const verifiedUser = { username, id };
        return verifiedUser;
    }
}
export default new UserModel();
