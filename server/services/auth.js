const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../../config/keys');

const validateLogin = require('../validation/login')

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

const logout = async data => {
    try {
        const existingUser = await User.findById(data._id);

        if (!existingUser) throw new Error("This User does not exist fam!");

        const token = '';
        return { token, loggedIn: false, ...existingUser._doc, password: null }
    } catch (err) {
        throw err;
    }
}

const login = async data => {
    try {
        // console.log(data)
        const { message, isValid } = validateLogin(data);

        if (!isValid) {
            throw new Error(message);
        }

        const { username, password } = data;

        const existingUser = await User.findOne({ username })

        if (!existingUser) throw new Error('This User does not Exist homie');

        const validPWord = await bcrypt.compareSync(password, existingUser.password)

        if (!validPWord) throw new Error('Invalid Password!')

        const token = jwt.sign({ id: existingUser._id}, keys.secretOrKey);

        return { token, loggedIn: true, ...existingUser._doc, password: null };

    } catch (err) {
        throw err;
    }   
};

const verifyUser = async data => {
    try {
        const { token } = data;

        const decoded = jwt.verify(token, keys.secretOrKey);
        const { id } = decoded;

        const loggedIn = await User.findById(id).then(user => {
            return user ? true : false
        });

        return { loggedIn };
    } catch (err) {
        return { loggedIn: false };
    }
}

module.exports = { register, logout, login, verifyUser };