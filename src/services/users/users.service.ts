import User, { IUser } from '../../persistence/models/user.mongo';
import bcrypt from 'bcrypt';

interface ServiceResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
}

const saltRounds = 10;

async function createUser(user: IUser): Promise<ServiceResponse> {
    try {
        user.username = user.username.toLowerCase();
        const found = await User.findOne({ username: user.username });

        if (found) {
            return {
                success: false,
                message: 'Username already taken',
            };
        }

        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        const newUser = new User(user);
        await newUser.save();

        return {
            success: true,
            message: 'User created successfully',
            data: { ...user, id: newUser._id },
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: 'An error occurred while creating the user',
                error: error.message,
            };
        } else {
            return {
                success: false,
                message: 'An unexpected error occurred',
            };
        }
    }
}

async function login(
    username: string,
    password: string
): Promise<ServiceResponse> {
    try {
        username = username.toLowerCase();
        const user = await User.findOne({ username });
        if (!user) {
            return {
                success: false,
                message: 'User Not Found',
            };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return {
                success: false,
                message: 'Incorrect Password',
            };
        }

        const result: any = user.toJSON();
        const id = result?._id;
        delete result._id;
        return {
            success: true,
            message: 'Login Successful',
            data: { id, ...result },
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: 'An error occurred while logging in',
                error: error.message,
            };
        } else {
            return {
                success: false,
                message: 'An unexpected error occurred',
            };
        }
    }
}

async function getUser(id: string): Promise<ServiceResponse> {
    try {
        const user = await User.findById(id);

        if (!user) {
            return {
                success: false,
                message: 'User Not Found',
            };
        }

        const result: any = user.toJSON();
        const userId = result._id;
        delete result._id;
        return {
            success: true,
            message: 'User found',
            data: { id: userId, ...result },
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: 'An error occurred while retrieving the user',
                error: error.message,
            };
        } else {
            return {
                success: false,
                message: 'An unexpected error occurred',
            };
        }
    }
}

async function getAllUsers(): Promise<ServiceResponse> {
    try {
        const users = await User.find();

        if (!users) {
            return {
                success: false,
                message: 'Users Not Found',
            };
        }
        const newUsers = users.map(user => {
            const { _id, ...userData } = user.toJSON();
            return { id: _id, ...userData };
        });

        return {
            success: true,
            message: 'Users found',
            data: newUsers,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: 'An error occurred while retrieving the users',
                error: error.message,
            };
        } else {
            return {
                success: false,
                message: 'An unexpected error occurred',
            };
        }
    }
}

async function updateUser(id: string, user: any): Promise<ServiceResponse> {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
            new: true,
        });

        if (!updatedUser) {
            return {
                success: false,
                message: 'User Not Found',
            };
        }

        return {
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: 'An error occurred while updating the user',
                error: error.message,
            };
        } else {
            return {
                success: false,
                message: 'An unexpected error occurred',
            };
        }
    }
}

async function deleteUser(id: string): Promise<ServiceResponse> {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: id });

        if (!deletedUser) {
            return {
                success: false,
                message: 'User Not Found',
            };
        }

        return {
            success: true,
            message: 'User deleted successfully',
            data: deletedUser,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: 'An error occurred while deleting the user',
                error: error.message,
            };
        } else {
            return {
                success: false,
                message: 'An unexpected error occurred',
            };
        }
    }
}

export default {
    login,
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
};
