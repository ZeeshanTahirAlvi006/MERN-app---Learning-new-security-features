import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./server/user/user_model.js";

dotenv.config({ path: "./server/.env" }); // Assuming .env is in server folder

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mern-day-1");
        console.log("Connected to DB");
        
        const user = await User.findOne().select("+password");
        if (user) {
            console.log("Found user:", user.email);
            console.log("Does user.password exist?", !!user.password);
            console.log("Full DB Document keys:", Object.keys(user._doc));
            console.log("Actual password value:", user.password);
            
            // Try explicit object projection
            const user2 = await User.findOne({ email: user.email }).select({ password: 1, email: 1 });
            console.log("With object projection:", !!user2.password);
        } else {
            console.log("No users in DB");
        }
    } catch (e) {
        console.error("Error:", e);
    } finally {
        mongoose.disconnect();
    }
}
check();
