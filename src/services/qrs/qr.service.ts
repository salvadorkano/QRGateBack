import qrMongo from '../../persistence/models/qr.mongo';
import QrInfoSchema, { Iqr } from '../../persistence/models/qr.mongo';
interface ServiceResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
}

async function createQR(qr: Iqr): Promise<ServiceResponse> {
    try {
        const newQr = new QrInfoSchema(qr);
        await newQr.save();
        return {
            success: true,
            message: 'QR created successfully',
            data: { ...qr, id: newQr._id },
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
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

async function getQRByUsername(username: string) {
    return QrInfoSchema.find({ username }).exec();
}

async function getQRByCustodian(username: string) {
    const qrCodes = await QrInfoSchema.find({ custodian: username });

    return qrCodes;
}

async function updateQR(id: string, qr: any): Promise<ServiceResponse> {
    try {
        const updatedUser = await qrMongo.findOneAndUpdate({ _id: id }, qr, {
            new: true,
        });

        if (!updatedUser) {
            return {
                success: false,
                message: 'QR Not Found',
            };
        }

        return {
            success: true,
            message: 'QR updated successfully',
            data: updatedUser,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: 'An error occurred while updating the qr',
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
    createQR,
    getQRByUsername,
    getQRByCustodian,
    updateQR,
};
