import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
    
        const existedUser = await User.findOne({
            $or: [{username}, {email}]
        })
    
        if (existedUser) {
            res.status(500).json({error : 'user already exists'})
        }
    
        const user = await User.create({
            username,
            email,
            password,
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password"
        )
    
        if (!createdUser) {
            res.status(500).json({error : 'something went wrong while registering the user'})
        }
    
        return res.status(201).json(
            {user: createdUser}
        )
    } catch (error) {
        console.log(error);
    }
}


export const getUser = async (req, res) => {
    try {
        res.status(201).json({'msg' : 'hello'})
    } catch (error) {
        res.status(500).json({'error' : error})
    }
}