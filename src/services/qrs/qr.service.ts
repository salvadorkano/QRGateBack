import QrInfoSchema from '../../persistence/models/qr.mongo';

async function createQR(qr: any) {
    // const found = await QrInfoSchema.findOne({ id: qr.id });

    // // if (found) {
    // //     return {
    // //         message: 'qr already exist',
    // //     };
    // // }

    const newQr = new QrInfoSchema(qr);
    await newQr.save();
    return { ...qr, id: qr._id };
}

async function getQRByUsername(username: string) {
    return QrInfoSchema.find({ username }).exec();
}

export default {
    createQR,
    getQRByUsername,
};
