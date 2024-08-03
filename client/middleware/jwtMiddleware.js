import jwt from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET;

// Middleware function to check JWT token
export async function jwtMiddleware(req) {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
        return new Response(
            JSON.stringify({ error_code: "Unauthorized", message: "No token provided" }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded; // Attach user info to request object
        return null; // No response needed; token is valid
    } catch (err) {
        return new Response(
            JSON.stringify({ error_code: "Unauthorized", message: "Invalid token" }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
