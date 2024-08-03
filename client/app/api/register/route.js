// api/register/route.js
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, res) => {
    const { name, username, email, password } = await req.json();
    try {
        await connectToDB();

        
        const newUser = new User({
            name: name,
            username: username,
            email: email,
        });
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });


        if (!existingUser) {
            await newUser.save();

        }
    
        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response("Failed to register user", { status: 500 });
    }
}
