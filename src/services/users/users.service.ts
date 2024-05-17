import User from '../../persistence/models/user.mongo';

async function createUser(user: any) {

    const found = await User.findOne({ username: user.username });

    if(found) {
        return {
            message: 'Username already taken'
        }
    }

    const newUser = new User(user);
    await newUser.save();
    return {...user, id: newUser._id};
}

async function login(username: string, password: string) {
    const user = await User.findOne({ username });

    if(!user) {
        return 'User Not Found';
    }

    if(user.password !== password) {
        return 'Incorrect Password';
    }
    
    const result: any = user?.toJSON();
    const id = result?._id;
    delete result?._id;
    return { id, ...result };
}

async function getUser(id: string) {
    const user = await User.findById(id);

    const result: any = user?.toJSON();
    delete result?._id;
    return { id, ...result };
}

async function updateUser(id: string, user: any) {
    await User.findOneAndUpdate({ _id: id }, user);
}

async function deleteUser(id: string) {
    await User.findOneAndDelete({ _id: id });
}


export default {
    login,
    createUser,
    getUser,
    updateUser,
    deleteUser
}