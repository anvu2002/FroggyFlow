import jwt from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET;

export function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, jwtSecretKey, { expiresIn });
}

export function verifyToken(token) {
    return jwt.verify(token, jwtSecretKey);
}
