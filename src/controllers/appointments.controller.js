import jwt from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js"
import Appointment from '../models/appointments.model.js';
import { User} from "../models/user.model.js"


const bookAppointment = asyncHandler(async (req, res) => {
    const { docName, date, time, reason, comment = '' } = req.body; // comment defaults to an empty string if not provided

    try {
        // Validate required fields
        if (!docName || !date || !time || !reason) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // if Token present get user data
        if(req.header("Authorization")) {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
            if (!user) {
                
                throw new ApiError(401, "Invalid Access Token")
            }
            req.user = user;
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            docName,
            date,
            time,
            reason,
            comment,
            patientName: req.user ? req.user.fullName : ""
        });

        // Save the appointment to the database
        const savedAppointment = await newAppointment.save();

        // Return success response
        res.status(201).json({
            message: "Appointment created successfully",
            appointment: savedAppointment
        });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export {
    bookAppointment
    }
    