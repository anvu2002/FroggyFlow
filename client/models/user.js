import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    email: {
        type: String,
        unique: [true, 'Email already exists.'],
        required: [true, 'Email is required.'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: [1, 'Username must be atleast 2 characters long.'],
        maxlength: [20, 'Username cannot exceed 20 characters.'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    password: {
        type: String,
        // required: [true, 'Password is required!']
    },
    profilePicture: {
        type: String,
        default: "https://static.thenounproject.com/png/1995071-200.png",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    role: {
        type: String,
        default: "user"
    },
    tags: {
        type: [String],
    },
    bio: {
        type: String,
        max: 150,
        default: ""
    },
    // socials: [String]
    youtube: {
        type: String,
        default: ""
    },
    youtubeSubscriberCount: {
        type: Number
    },
    instagram: {
        type: String,
        default: ""

    },
    tiktok: {
        type: String,
        default: ""

    },
    x: {
        type: String,
        default: ""

    },
    firstTime: {
        type: Boolean,
        default: true,
    },
    connects: {
        type: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        default: [],
    },
    pendingConnects: {
        type: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        default: [],
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
});

UserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await this.model('User').updateMany(
            {
                $or: [
                    { 'connects.user': this._id },
                    { 'pendingConnects.user': this._id }
                ]
            },
            {
                $pull: {
                    connects: { user: this._id },
                    pendingConnects: { user: this._id }
                }
            }
        );
        next();
    } catch (err) {
        next(err);
    }
});

const User = models.User || model("User", UserSchema);
export default User;