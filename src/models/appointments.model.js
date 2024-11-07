import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    docName: {
        type: String,
        required: true,
        trim: true
    },
    docId: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,  // Only stores the date part
        required: true
    },
    time: {
        type: String,  // Stores time as "HH:MM AM/PM" format
        required: true,
        trim: true,
        match: /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/  // Regular expression for "HH:MM AM/PM" format
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    patientName: {
        type: String,
        trim: true
    },
    patientId: {
        type: String,
        trim: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
