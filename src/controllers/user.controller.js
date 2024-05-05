import { User } from "../models/user.model.js";

const generateUserAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
    
        return accessToken
    } catch (error) {
        console.log(error);
        return
    }
}

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    
    if ([username, email, password].some((field) => field?.trim() === "")) { 
        return res.status(400).json({error : 'all fields are required'})
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        return res.status(400).json({error : 'User with this username or email already exists'})
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        return res.status(400).json({error: "something went wrong while registering the user"})
    }

    const accessToken = await generateUserAccessToken(createdUser._id);

    return res.status(200).json({
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        accessToken
    })
}

export const loginUser = async (req, res) => {
    const { username, email, password } = req.body
    
    if (!username && !email) {
        return res.status(400).json({error : "username or email is required"})
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        return res.status(400).json({error : "user does not exist"})
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        return res.status(400).json({error : "Invalid user credentials"})
    }

    const loggedInUser = await User.findById(user._id).select("-password")

    const accessToken = await generateUserAccessToken(loggedInUser._id);

    return res.status(200).json({
        _id: loggedInUser._id,
        username: loggedInUser.username,
        email: loggedInUser.email,
        accessToken
    })
}


export const getUser = async (req, res) => {
    try {
        res.status(201).json(req.user)
    } catch (error) {
        res.status(500).json({error : 'couldnt get the current user'})
    }
}


export const logout = async (req, res) => {
    
}