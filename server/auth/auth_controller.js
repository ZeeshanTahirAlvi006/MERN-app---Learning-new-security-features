import { authenticateUser } from "./auth_service.js";
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authenticateUser(email, password);
        //prevents from XSS attacks - restricts JS from reading thw token
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict"
        })
        res.status(200).json({ message: "Login success" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}