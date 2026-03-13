import { User } from "./user_model.js";

export const createUser = async (userData) => {
    const exists = await User.findOne({ email: userData.email });
    if (exists) {
        throw new Error("Email already binded to another user!");
    }
    const user = new User(userData);
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
