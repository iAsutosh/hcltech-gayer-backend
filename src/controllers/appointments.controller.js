import {asyncHandler} from "../utils/asyncHandler.js"
import Appointment from '../models/appointments.model.js';


const bookAppointment = asyncHandler(async (req, res) => {
    const { docName, date, time, reason, comment = '' } = req.body; // comment defaults to an empty string if not provided

    try {
        // Validate required fields
        if (!docName || !date || !time || !reason) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            docName,
            date,
            time,
            reason,
            comment
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
    