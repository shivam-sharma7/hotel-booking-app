import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB as string, { 
    }).then(() => console.log("MongoDB Connected")).catch(() => console.log("MongoDB is not Connected"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};