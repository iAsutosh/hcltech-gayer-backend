import jwt from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js"
import Appointment from '../models/appointments.model.js';
import { User} from "../models/user.model.js"


const bookAppointment = asyncHandler(async (req, res) => {
    const { docName, docId, date, time, reason, comment = '' } = req.body; // comment defaults to an empty string if not provided

    try {
        // Validate required fields
        if (!docName || !docId || !date || !time || !reason) {
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
            docId,
            date,
            time,
            reason,
            comment,
            patientName: req.user ? req.user.fullName : "",
            patientId: req.user ? req.user._id : "",
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

const getAppointment = asyncHandler(async (req, res) => {
    try {
        const role = req.user.role;
        if( role === 'doctor') {
            const result = await Appointment.find({docId: req.user.id});
            return res.status(200).json(result);
        }
        const result = await Appointment.find({patientId: req.user.id})
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error Fetching appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




export {
    bookAppointment,
    getAppointment
    }
    