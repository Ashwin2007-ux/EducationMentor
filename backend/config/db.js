import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected:', conn.connection.host);
    return conn;
  } catch (error) {
    console.warn('⚠️  MongoDB Connection Warning:', error.message);
    console.warn('⚠️  Running in demo mode (data will not persist)');
    return null;
  }
};
