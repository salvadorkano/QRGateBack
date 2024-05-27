import { Schema, model } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    houseNumber: number;
    building: string;
    username: string;
    password: string;
    role: 'ADMIN' | 'CUSTODIAN' | 'RESIDENT';
}

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    building: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'CUSTODIAN', 'RESIDENT'],
    },
});

export default model<IUser>('User', UserSchema);
