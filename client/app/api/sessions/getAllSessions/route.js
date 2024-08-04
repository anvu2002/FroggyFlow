import { jwtMiddleware } from '@/middleware/jwtMiddleware';
import { connectToDB } from '@/utils/database';
import Session from "@/models/session";

export const POST = async (req, res) => {
  const { email } = await req.json();

  try {
    await connectToDB();
    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    const sessions = await Session.find({ email });
    if (!sessions) {
      return new Response("Sessions for user email not found", { status: 404 });
    }

    return new Response(JSON.stringify(sessions), { status: 200 });

  } catch (error) {
    console.error('Error fetching sessions by user email:', error);
    return new Response("Internal server error", { status: 500 });
  }
}
