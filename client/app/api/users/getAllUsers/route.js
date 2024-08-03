import { jwtMiddleware } from '@/middleware/jwtMiddleware';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export async function GET(req) {
    const authResponse = await jwtMiddleware(req);
    if (authResponse) {
        return authResponse;
    }

    try {
        await connectToDB();
        const users = await User.find();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
