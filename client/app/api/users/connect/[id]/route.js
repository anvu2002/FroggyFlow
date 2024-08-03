// api/users/[id]/connect/route.js
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
    const id = params.id;
    const { currentUserId } = await req.json();

    try {
        await connectToDB();

        const currentUser = await User.findById(currentUserId);
        const userToConnect = await User.findById(id);

        if (!userToConnect) {
            return new Response("User not found", { status: 404 });
        }

        const existingConnection = currentUser.connects.find(
            (connect) => connect.user.toString() === userToConnect._id.toString()
        );

        if (existingConnection) {
            return new Response("Already connected to the user", { status: 400 });
        }

        const pendingConnection = currentUser.pendingConnects.find(
            (connect) => connect.user.toString() === userToConnect._id.toString()
        );

        if (pendingConnection) {
            return new Response("Connection request already sent", { status: 400 });
        }

        userToConnect.pendingConnects.push({
            user: currentUser._id,
        });


        await userToConnect.save();

        return new Response("Connection request sent", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};