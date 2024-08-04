// api/sessions/createSession/route.js
import { connectToDB } from "@/utils/database";
import Session from "@/models/session";

export const POST = async (req, res) => {
    const { score, start, data, email } = await req.json();

    try {
        await connectToDB();

        const newSession = new Session({
            score: score,
            start: start,
            data: data,
            email: email,
        });

        await newSession.save();
    
        return new Response(JSON.stringify(newSession), { status: 201 });
    } catch (error) {
        return new Response("Failed to save session", { status: 500 });
    }
}
