import mongoose, {Schema} from "mongoose";

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    availableTimeSlots: {
        type: [String], // Array of time slot strings
        required: true,
        validate: [arrayLimit, '{PATH} requires at least one time slot']
    }
});

// Custom validator to ensure at least one time slot is present
function arrayLimit(val) {
    return val.length > 0;
}

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
