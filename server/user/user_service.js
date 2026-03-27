import { User } from "./user_model.js";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
    const exists = await User.findOne({ email: userData.email });
    if (exists) {
        throw new Error("Email already binded to another user!");
    }
    const { first_name, last_name, username, email, password, role } = userData;
    let { middle_name } = userData;

    // Prevent Mongoose minLength validation error if middle_name is empty string 
    if (!middle_name || middle_name.trim() === "") {
        middle_name = undefined;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // User schema expects 'password', not 'hashedPassword'
    const user = new User({ first_name, middle_name, last_name, username, email, password: hashedPassword, role });
    await user.save();
    return user;
}
export const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User does not exists!");
    }
    return user;
}
export const getUserByRole = async (role) => {
    const user = await User.find({ role });
    if (!user) {
        throw new Error("User does not exists!");
    }
    return user;
}
