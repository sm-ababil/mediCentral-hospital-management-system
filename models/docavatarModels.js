const mongoose = require('mongoose');

const docavatarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const docavatarModel = mongoose.model('docavatars', docavatarSchema);

module.exports = docavatarModel;