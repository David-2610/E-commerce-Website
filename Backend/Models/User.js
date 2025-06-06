const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'customer'], default: 'customer' }
}, { timestamps: true });

// Hash password before saving to database PRE IS USED TO MAKE SURE IT RUN BEFORE SAVE AS SAVE IS IN BRACKET
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();// If password is not modified, skip hashing
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
    next();
});
// Match user eneterted password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
};


module.exports = mongoose.model('User', userSchema); // Export the User model