import jwt from "jsonwebtoken";
import { User } from "../user/user_model";
export const authenticateUser = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
        throw new Error("User does not exists!");
    }
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET, { expiresIn: "1d" })
    return { user, token };
}