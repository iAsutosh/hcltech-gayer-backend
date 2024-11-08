import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import Doctor  from "../models/doctor.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        await user.save({ validateBeforeSave: false })
        return accessToken;

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    try {
        const {fullName, email, password } = req.body

    if (
        [fullName, email, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({"message": "All fields are required" });

    }

    const existedUser = await User.findOne({
       email: email
    })

    if (existedUser) {
        return res.status(400).json({"message": "User with email or username already exists" });
    }
   
    const user = await User.create({
        fullName,
        email, 
        password,
        role: 'patient'
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        return res.status(500).json({"message": "Something went wrong while registering the user" });
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    } catch (error) {
        console.log('Errror in User Register', error)
        res.status(500).json({ message: "Internal server error" });
    }

} )

const loginUser = asyncHandler(async (req, res) =>{

   try {
    const {email, password} = req.body
    console.log(email);

    if (!email) {
        return res.status(400).json({"message": "username or email is required" });

    }


    const user = await User.findOne({
        email:email
    })

    if (!user) {
        return res.status(402).json({"message": "User does not exist" });
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    return res.status(401).json({"message": "Invalid user credentials" });

    }

   const accessToken = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken
            },
            "User logged In Successfully"
        )
    )
   } catch (error) {
    console.log('Errror in User Login', error)
    res.status(500).json({ message: "Internal server error" });
   }

})

const getDoctorsBySpecialization = asyncHandler(async (req, res) => {
    try {
      // Fetch all doctors from the database
      const doctors = await Doctor.find();
  
      // Map to return only the required details: name, specialization, and availableTimeSlots
  
      // Return the list of doctors
      return res.status(200).json({
        success: true,
        data: doctors,
        message: "Doctors fetched successfully",
      });
    } catch (error) {
      // Handle any errors during the database query
      return res.status(500).json({
        success: false,
        message: "Server error while fetching doctors",
        error: error.message,
      });
    }
  });



export {
    registerUser,
    loginUser,
    getDoctorsBySpecialization
}