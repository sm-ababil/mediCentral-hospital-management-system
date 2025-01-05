const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors',
        required: [true, "Doctor ID is required"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "User ID is required"]
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating"],
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: [true, "Please provide your feedback"],
        trim: true,
        minlength: [10, "Review must be at least 10 characters"],
        maxlength: [500, "Review cannot exceed 500 characters"]
    },
    appointmentDate: {
        type: Date,
        required: [true, "Appointment date is required"]
    },
    userName: {
        type: String,
        required: [true, "User name is required"]
    }, 

}, {
    timestamps: true
});

feedbackSchema.index({ doctorId: 1, userId: 1 }, { unique: true });

feedbackSchema.virtual('doctor', {
    ref: 'doctors',
    localField: 'doctorId',
    foreignField: '_id',
    justOne: true
});

const feedbackModel = mongoose.model('feedbacks', feedbackSchema);

module.exports = feedbackModel;