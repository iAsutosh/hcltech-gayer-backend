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

} )

const loginUser = asyncHandler(async (req, res) =>{

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

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const getDoctorsBySpecialization = asyncHandler(async (req, res) => {
    try {
        // Fetch all doctors from the database
        const doctors = await Doctor.find();

        // Group doctors by specialization
        const groupedDoctors = doctors.reduce((acc, doctor) => {
            // Find the specialization group or create one
            const specializationGroup = acc.find(group => group.name === doctor.specialization);

            if (specializationGroup) {
                // If the group already exists, add the doctor to the list
                specializationGroup.doctors.push({
                    name: doctor.name,
                    availableTimeSlots: doctor.availableTimeSlots
                });
            } else {
                // If the group doesn't exist, create a new group with this doctor
                acc.push({
                    name: doctor.specialization,
                    doctors: [{
                        name: doctor.name,
                        availableTimeSlots: doctor.availableTimeSlots
                    }]
                });
            }

            return acc;
        }, []);

        // Return the grouped data in the required format
        return res.status(200).json({
            success: true,
            data: groupedDoctors,
            message: "Doctors fetched by specialization successfully"
        });

    } catch (error) {
        // Handle any errors during the database query
        return res.status(500).json({
            success: false,
            message: "Server error while fetching doctors by specialization",
            error: error.message
        });
    }
});



export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getDoctorsBySpecialization
}