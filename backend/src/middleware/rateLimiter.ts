import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs:  30 * 60 * 1000, // 30 minutes 
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 30 minutes",
    standardHeaders: 'draft-6',
    legacyHeaders: false,
    statusCode: 429
});