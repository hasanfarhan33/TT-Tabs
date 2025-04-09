const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs")
const validator = require('validator')

const userSchema = new mongoose.Schema({
    displayName: {
        type: String, 
        required: true, 
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true,
    },
    totalWins: {
        type: Number, 
        default: 0
    }, 
    totalMatches: {
        type: Number, 
        default: 0
    }
}, {timestamps: true})

// Static register method 
userSchema.statics.register = async function(displayName, email, password) {
    // Make sure all the fields are provided 
    if (!displayName || !email || !password) {
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)) {
        throw Error("You call that an email? That's not an email.")
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Weak Password")
    }

    // Check if user already exists 
    const existingUser = await this.findOne({email})
    if(existingUser) {
        throw Error("User already exists ya dumb dodo")
    }

    // Encrypting the password 
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(password, salt)

    // Creating the user in DB 
    const user = await this.create({displayName, email, password:hash})

    return user 

}


// Static login method 
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error("You missed something like you miss your serves. Wear your glasses"); 
    }

    // Check if the email already exists 
    const user = await this.findOne({email})

    if(!user) {
        throw Error("Don't think you entered the right email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("You forget password like you forget your scores")
    }

    return user; 
}

const User = mongoose.model("User", userSchema); 

module.exports = User; 