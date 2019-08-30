const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 32
    },
    albums: [
        {
            type: Schema.Types.ObjectId,
            ref: "albums"
        }
    ],
    artist: {
      type: Boolean,
      default: false,
      require: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', UserSchema);