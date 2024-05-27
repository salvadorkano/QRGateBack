import { Schema, model } from 'mongoose';

export interface Iqr {
    username: String;
    firstName: String;
    lastName: String;
    friendName: String;
    friendLastName: String;
    houseNumber: Number;
    building: String;
    dateInit: String;
    hourInit: String;
    duration: String;
    custodian: String;
    status: 'ENTER' | 'OUT' | 'WAIT';
}
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
    custodian: String,
    status: {
        type: String,
        required: true,
        enum: ['ENTER', 'OUR', 'WAIT'],
    },
});

export default model<Iqr>('QrInfo', QrInfoSchema);
