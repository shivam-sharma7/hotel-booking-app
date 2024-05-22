import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserTypes } from './userTypes';

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// encrypt password before save
userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// check if password is correct
userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};


export const User = mongoose.model<UserTypes>('User', userSchema);