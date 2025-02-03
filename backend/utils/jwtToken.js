import jwt from 'jsonwebtoken';

const key = process.env.KEY;

function getToken({ id, name, email }) {
    const token = jwt.sign({ id, name, email }, key);
    return token;
}

function verifyToken(token) {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, key);
        return decoded;
    } catch (error) {
        return null;
    }
}

export { getToken, verifyToken };
