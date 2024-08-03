// api/users/[id]/reject-connect/route.js
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
    const { id } = params;
    const { currentUserId } = await req.json();

    try {
        await connectToDB();

        const currentUser = await User.findById(currentUserId);
        const userToReject = await User.findById(id);

        if (!currentUser) {
            return new Response("Current user not found", { status: 404 });
        }

        if (!userToReject) {
            return new Response("User not found", { status: 404 });
        }

        const pendingConnection = currentUser.pendingConnects.find(
            (connect) => connect.user.toString() === userToReject._id.toString()
        );

        if (!pendingConnection) {
            return new Response("No pending connection request from the user", { status: 400 });
        }

        // Remove the pending connection from both users
        // necessary? because there is nothing in the db for the user that requests
        currentUser.pendingConnects.pull({ user: userToReject._id });
        userToReject.pendingConnects.pull({ user: currentUser._id });

        await currentUser.save();
        await userToReject.save();

        return new Response("Connection request rejected", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};