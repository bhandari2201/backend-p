import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    
    // get details from frontend

    const {username,email,fullname,password} = req.body
    console.log("email:", email);

    // validation

    // if (fullname === "") {
    //     throw new ApiError(400,"fullname is required")
    // }

    if (
        [username,email,fullname,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400,"All Fiels are required");
    } 

    // Check if user already exist
    const existeduser = User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }

    // check for images,check for avatar

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required")
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }

    // create user object
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImagge?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refreshtoken

    const createdUser = await User.findaById(user._id).select(
        "-password -refreshToken"
    )

    // check fr user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    } 

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

} )



export {registerUser}