import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { jwtMiddleware } from '@/middleware/jwtMiddleware';


export const GET = async (req, { params }) => {
    const authResponse = await jwtMiddleware(req);
    if (authResponse) {
        return authResponse;
    }
    
    try {
        await connectToDB();
        const user = await User.findById(params.id)
            .populate({
                path: "connects.user",
                model: "User",
                select: "-connects -pendingConnects", // Exclude circular references
            })
            .populate({
                path: "pendingConnects.user",
                model: "User",
                select: "-connects -pendingConnects", // Exclude circular references
            });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return new Response("Internal Server Error", { status: 500 })
    }
}