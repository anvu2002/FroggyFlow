// api/users/[id]/remove-connect/route.js
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
    const { id } = params;
    const { currentUserId } = await req.json();

    try {
        await connectToDB();

        const currentUser = await User.findById(currentUserId);
        const userToRemove = await User.findById(id);

        if (!currentUser) {
            return new Response("Current user not found", { status: 404 });
        }

        if (!userToRemove) {
            return new Response("User not found", { status: 404 });
        }

        const existingConnection = currentUser.connects.find(
            (connect) => connect.user.toString() === userToRemove._id.toString()
        );

        if (!existingConnection) {
            return new Response("No existing connection with the user", {
                status: 400,
            });
        }

        // Remove the connection from both users
        currentUser.connects.pull({ user: userToRemove._id });
        userToRemove.connects.pull({ user: currentUser._id });

        await currentUser.save();
        await userToRemove.save();

        return new Response("Connection removed successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};