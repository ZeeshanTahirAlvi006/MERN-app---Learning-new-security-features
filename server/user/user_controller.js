import { createUser, getUserById, getUserByRole } from "./user_service.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await createUser({ name, email, password, role });
        res.status(201).json({ message: "User Registered Successfully!" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getProfileById = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await getUserById(id);
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}