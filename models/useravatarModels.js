const mongoose = require('mongoose');

const useravatarSchema = new mongoose.Schema({
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

const useravatarModel = mongoose.model('useravatars', useravatarSchema);

module.exports = useravatarModel;