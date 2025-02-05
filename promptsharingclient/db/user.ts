import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exists!'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email invalid, it should be a valid email address!"]
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: [true, 'Username already exists!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/, "Password invalid, it should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character!"]
    },
    image: {
        type: String,
    }
})

const User = models.User || model('User', UserSchema);
export default User;