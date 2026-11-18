
const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'No valid token provided'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Support both older token formats and the corrected format
        const userId = decoded._id || decoded.id;

        if (!userId) {
            return res.status(401).json({
                message: 'Invalid user information in token'
            });
        }

        req.user = {
            ...decoded,
            _id: userId,
            id: userId
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Not authorized. Please login again.'
        });
    }
};

module.exports = authenticationMiddleware;
