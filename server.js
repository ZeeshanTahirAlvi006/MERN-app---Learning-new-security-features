import express from "express";
import dotenv from "dotenv" //loads env variables
import rateLimit from "express-rate-limiter" //limits the number of requests from single API
import helmet from "helmet" //sets various HTTP headers to protect from man in the middle , click jacking and packet sniffing attacks
import cors from "cors" //enables resource sharing between frontend and backend
import hpp from "hpp" //prevents from parameter pollution
import mongoSanitize from "express-mongo-sanitize" //prevents nosql injection
import cookieParser from "cookie-parser" //parses cookies
import xss from "xss-clean" //prevents XSS attacks
import multer from "multer" //To handle file uploads
import path from "path" //To handle file paths
import fs from "fs" //To handle file system operations
import { globalErrorHandler } from "./errors/error_controller.js";

//Rate Limiter
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "To many requests, try again in 15 minutes",
});
const app = express();//To create an express application
const port = process.env.PORT || 5000; //To set the port number
dotenv.config({ path: "./.env" }); //To load env variables
//Middle Ware
app.use(rateLimiter); //To apply rate limit on all api's automatically
app.use(helmet()); //To set various HTTP headers to protect from man in the middle , click jacking and packet sniffing attacks
app.use(cors()); //To enable resource sharing between frontend and backend
app.use(xss()); //To prevent XSS attacks
app.use(hpp()); //To prevent parameter pollution
app.use(mongoSanitize()); //To prevent nosql injection
app.use(cookieParser()); //To parse cookies
app.use(express.json({ limit: "10kb" })) //Note: increase the capacity for payloads like images separately
app.use(express.urlencoded({ extended: true, limit: "10kb" }))
app.use(express.static("public")) //To serve static files
app.use(express.static("uploads")) //To serve uploaded files
app.use(express.static("client/dist")) //To serve the built React app


app.use(globalErrorHandler);