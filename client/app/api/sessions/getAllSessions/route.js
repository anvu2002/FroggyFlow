import { jwtMiddleware } from '@/middleware/jwtMiddleware';
import { connectToDB } from '@/utils/database';
import Session from "@/models/session";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const email = params.email;
    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    const sessions = await Session.findAll({ email });
    if (!sessions) {
      return new Response("Sessions for user email not found", { status: 404 });
    }

    return new Response(JSON.stringify(sessions), { status: 200 });

  } catch (error) {
    console.error('Error fetching sessions by user email:', error);
    return new Response("Internal server error", { status: 500 });
  }
}
