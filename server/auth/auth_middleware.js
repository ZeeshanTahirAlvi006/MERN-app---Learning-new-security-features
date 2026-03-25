import { promisify } from "util"; //To convert callback based function to promise based function
import jwt from "jsonwebtoken"; //To create and verify JWT tokens
import User from "../user/user_model.js"; //To access the User model
import AppError from "../errors/AppError.js"; //To create custom errors
import catchAsync from "../errors/catchAsync.js"; //To handle asynchronous errors
export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new AppError("You are not logged in!", 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError("The user belonging to this token does no longer exist", 401));
    }
    req.user = currentUser;
    next();
})
export const restrictTo = (...roles) => {
    if (!roles.includes(requestAnimationFrame.user.role)) {
        return res.status(403).json({
            message: "You do not have permission to access this resource!",
            status: "fail",
            statusCode: 403,
            error: "Forbidden"
        })
    }
    next();
}