import { connectToDB } from "@/utils/database";
import User from "@/models/user";
const bcrypt = require('bcrypt');

export const POST = async (req) => {
    try {
        const { token } = await req.json();

        if (!token) {
            return new Response(JSON.stringify({ message: 'Token is required' }), { status: 400 });
        }

        await connectToDB();

        // Find the user by the token
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() }, // Check if the token is not expired
        });

        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 400 });
        }

        // Verify the token
        const isTokenValid = await bcrypt.compare(user._id.toString(), token);
        if (!isTokenValid) {
            return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 400 });
        }

        // Update the user to mark email as verified
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        return new Response(JSON.stringify({ message: 'Email verified successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error verifying email:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
