// api/users/[id]/cancel-connect/request.js
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
    const id = params.id;
    const { currentUserId } = await req.json();

    try {
        await connectToDB();

        const currentUser = await User.findById(currentUserId);
        const userToCancelRequest = await User.findById(id);

        if (!currentUser) {
            return new Response("Current user not found", { status: 404 });
        }

        if (!userToCancelRequest) {
            return new Response("User not found", { status: 404 });
        }

        // Find the connect request in the user's pendingConnects array
        const connectRequestIndex = userToCancelRequest.pendingConnects.findIndex(
            connect => connect.user.toString() === currentUser._id.toString()
        );

        if (connectRequestIndex === -1) {
            return new Response("No connect request sent to the user", { status: 400 });
        }

        // Remove the connect request from the user's pendingConnects array
        userToCancelRequest.pendingConnects.splice(connectRequestIndex, 1);

        await userToCancelRequest.save();

        return new Response("Connect request canceled", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
