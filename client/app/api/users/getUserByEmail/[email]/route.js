import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {
      try {
        await connectToDB();
        const email = params.email;
        if (!email) {
            return new Response("Email is required", { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });

    } catch (error) {
        console.error('Error fetching user by email:', error);
        return new Response("Internal server error", { status: 500 });
    }
}
