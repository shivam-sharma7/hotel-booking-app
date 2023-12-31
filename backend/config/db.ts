import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB as string, { 
    }).then(() => console.log("MongoDB Connected")).catch((err) => console.log(err));
  } catch (error) {
    console.error("MongoDB id Connected");
    process.exit(1);
  }
};