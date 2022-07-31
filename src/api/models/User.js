import mongoose from 'mongoose'
const { randomBytes, scryptSync } = await import('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3
    },
    password: String,
    salt: String
}, { versionKey: false })

UserSchema.pre('save', async function() {
    this.salt = randomBytes(16).toString('base64')
    this.password = scryptSync(this.password, this.salt, 64).toString('base64')
})

UserSchema.methods.validPassword = async function(password) {
    const correct = scryptSync(password, this.salt, 64).toString('base64')
    return correct === this.password
}

export default mongoose.model('Users', UserSchema)
