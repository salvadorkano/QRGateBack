import User from '../../persistence/models/user.mongo';

export class UsersService {
    async createUser(user: any) {
        const newUser = new User(user);
        return newUser;
    }

    async getUser(id: string) {
        const user = await User.findById(id);
        return user;
    }

    async updateUser(id: string, user: any) {
        await User.findOneAndUpdate({ _id: id}, user);
    }

    async deleteUser(id: string) {
        await User.findOneAndDelete({ _id: id });
    }
}