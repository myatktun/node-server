import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const { randomBytes, scryptSync } = await import('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
        unique: true
    },
    password: String,
    salt: String,
    role: {
        type: String,
    }
}, { versionKey: false })

UserSchema.pre('save', async function() {
    this.salt = randomBytes(16).toString('base64')
    this.password = scryptSync(this.password, this.salt, 64).toString('base64')
})

UserSchema.methods.createJWT = function() {
    const id = new Date().getDate()
    return jwt.sign({ id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME })
}

UserSchema.methods.validPassword = async function(password) {
    const correct = scryptSync(password, this.salt, 64).toString('base64')
    return correct === this.password
}

export default mongoose.model('Users', UserSchema)
