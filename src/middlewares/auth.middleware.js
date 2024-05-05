import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            res.status(401).json({error : 'unauthorized request'})
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            res.status(401).json({error : 'invalid access token'})
        }
    
        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}