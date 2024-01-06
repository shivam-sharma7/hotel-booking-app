import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserTypes = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
});

// encrypt password before save
userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

export const User = mongoose.model<UserTypes>('User', userSchema);