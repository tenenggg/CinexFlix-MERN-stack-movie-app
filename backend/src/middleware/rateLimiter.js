import { ratelimit } from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {


    try {

        const { success } = await ratelimit.limit(`my-limit-key`);
        // we can link this with user id, when the user is logged in or with user ip address, when the user is not logged in

        if (!success) {
            return res.status(429).json({ error: 'Too many requests, Try again later' });
        }
        next();
    }

    catch (error) {
        console.log("Rate limit is disabled for now, but in production it would be enabled for security reasons.");

    }
}


export default rateLimiter