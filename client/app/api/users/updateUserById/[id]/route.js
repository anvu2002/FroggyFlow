import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { jwtMiddleware } from '@/middleware/jwtMiddleware';

// import bodyParser from 'body-parser';
// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };
export const PATCH = async (req, { params }) => {
    const body = await req.json();

    // const authResponse = await jwtMiddleware(req);
    // if (authResponse) {
    //     return authResponse;
    // }

    try {
        await connectToDB();

        const existingUser = await User.findById(params.id);
        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }
        const propertiesToUpdate = ['name', 'username', 'profilePicture', 'bio', 'youtube', 'instagram', 'tiktok', 'x', 'tags', 'firstTime'];

        // Iterate over each property and update if it exists in the request body
        propertiesToUpdate.forEach(property => {
            if (body[property] !== undefined) {
                existingUser[property] = body[property];
            }
        });

        await existingUser.save();
        return new Response("Successfully updated User", { status: 200 });
    } catch (error) {
        console.error('Error updating user by ID:', error);
        return new Response("Internal Server Error", { status: 500 });
    }
}