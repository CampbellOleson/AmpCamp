const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../../config/keys');

const validateRegister = require('../validation/register');

const register = async data => {
    
    try {
        const { message, isValid } = validateRegister(data);
        
        if (!isValid) {
            throw new Error(message)
        }

        const { username, email, password} = data;

        const existingUser = await User.findOne({email});

        if (existingUser){
            throw new Error("This user already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        },
            err => {
                if (err) throw err;
            }
        )
        user.save();

        const token = jwt.sign({ id: user._id }, keys.secretOrKey);
        return { token, loggedIn: true, ...user._doc, password: null };

    } catch (err) {
        throw err;
    }

};

module.exports = { register };