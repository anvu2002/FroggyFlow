// api/register/route.js
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { sendEmail } from "@/helpers/mailer";
const bcrypt = require('bcrypt');

export const POST = async (req, res) => {
    const { name, username, email, password } = await req.json();
    try {
        await connectToDB();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
        });
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        const existingUserName = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });


        if (existingUser) {
            // Determine which field(s) already exist
            const errors = {};
            if (existingUserName) {
                errors.username = 'Username';
            } if (existingEmail) {
                errors.email = 'Email';
            }

            return new Response(JSON.stringify({ message: errors , res: existingUser}), { status: 409 });
        }

        await newUser.save();

        await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response("Failed to register user", { status: 500 });
    }
}
