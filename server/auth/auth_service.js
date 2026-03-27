import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../user/user_model.js";

export const authenticateUser = async (email, password) => {

    // Fetch directly from the native MongoDB Node.js driver to guarantee we get exactly what you saw in your DB.
    const user = await mongoose.connection.db.collection('users').findOne({ email: email.toLowerCase() });

    if (!user) {
        throw new Error("User does not exists!");
    }

    const dbPassword = user.password || user.hashedPassword;
    if (!dbPassword) {
        throw new Error("Critical: Native MongoDB driver still says password is missing from DB record.");
    }

    // Direct bcrypt comparison without depending on document method
    const isValid = await bcrypt.compare(password, dbPassword);
    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    // Convert ObjectId to string since Mongoose isn't doing it automatically here
    const userIdStr = user._id.toString();

    const token = jwt.sign({
        id: userIdStr,
        role: user.role,
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Remove password before returning
    delete user.password;
    delete user.hashedPassword;
    user.id = userIdStr; // mirror Mongoose virtual id

    return { user, token };
}