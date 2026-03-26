import mongoose from "mongoose";
import bcrypt from "bcrypt";
//Block NoSQL Injection
mongoose.set('sanitizeFilter', true);
//Block Sensitive Field Projection
mongoose.set('sanitizeProjection', true);
//Ensure Data Atomic Integrity (Consistency of data)
mongoose.set('transactionAsyncLocalStorage', true);
//Strict Query Mode
mongoose.set('strictQuery', true);
export const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [30, "Name must be at most 30 characters long"]
    },
    middle_name: {
        type: String,
        required: false,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [30, "Name must be at most 30 characters long"]
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [30, "Name must be at most 30 characters long"]
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [30, "Username must be at most 30 characters long"],
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, 'Email format is invalid. Please enter a valid email.'],
        lowercase: true,
    }, password: {
        type: String,
        required: true,
        trim: true,
        minLength: [6, "Password must be at least 6 characters long"],
        select: false, //prevents password from being returned by default
    }, role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.password;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})
userSchema.methods.comparePassword = async function (password) {
    if (!this.password) {
        throw new Error("Password field not selected! Use .select('+password')")
    }
    return await bcrypt.compare(password, this.password);
}
userSchema.virtual('full_name').get(function () {
    const middle = this.middle_name ? `${this.middle_name}` : '';
    return `${this.first_name} ${middle} ${this.last_name}`;
})

export const User = mongoose.model("User", userSchema);
