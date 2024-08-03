// api/users/[id]/accept-connect/route.js
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
    const { id } = params;
    const { currentUserId } = await req.json();

    try {
        await connectToDB();

        const currentUser = await User.findById(currentUserId);
        const userToAccept = await User.findById(id);

        if (!currentUser) {
            return new Response("Current user not found", { status: 404 });
        }

        if (!userToAccept) {
            return new Response("User not found", { status: 404 });
        }

        const pendingConnection = currentUser.pendingConnects.find(
            (connect) => connect.user.toString() === userToAccept._id.toString()
        );

        if (!pendingConnection) {
            return new Response("No pending connection request from the user", {
                status: 400,
            });
        }

        // Remove the pending connection from both users
        currentUser.pendingConnects.pull({ user: userToAccept._id });
        userToAccept.pendingConnects.pull({ user: currentUser._id });

        // Add the connection to both users
        currentUser.connects.push({
            user: userToAccept._id,
        });

        userToAccept.connects.push({
            user: currentUser._id,
        });

        await currentUser.save();
        await userToAccept.save();

        return new Response("Connection request accepted", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};