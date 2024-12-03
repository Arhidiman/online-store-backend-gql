import { User } from "./User"

class UserModel {

    async getOne(username: string, password: string) {
        return await User.findOne({raw: true, where: { username, password }})
    }

}


export default new UserModel()