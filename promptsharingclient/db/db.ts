import mongoose from 'mongoose';

let isConnected = false; // track the connection
let mongoUri: any = process.env.MONGO_URI;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(mongoUri, {})

        isConnected = true;

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}