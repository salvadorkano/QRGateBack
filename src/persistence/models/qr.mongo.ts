import { Schema, model } from 'mongoose';

const QrInfoSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    friendName: String,
    friendLastName: String,
    houseNumber: Number,
    building: String,
    dateInit: String,
    hourInit: String,
    duration: String,
    id: String,
});

export default model('QrInfo', QrInfoSchema);
