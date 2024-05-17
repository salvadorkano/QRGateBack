import { Schema, model } from "mongoose";

const QrInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    houseNumber: Number,
    building: String,
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['ADMIN', 'CUSTODIAN', 'RESIDENT']
    }
});

export default model('QrInfo', QrInfoSchema);