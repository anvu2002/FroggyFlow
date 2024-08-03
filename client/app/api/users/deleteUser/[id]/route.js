import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);
        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Use deleteOne to remove the user and trigger the pre-remove middleware
        await user.deleteOne();
        return new Response("Successfully deleted User", { status: 200 });
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
