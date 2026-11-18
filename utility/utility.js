
const jwt = require('jsonwebtoken');

const generateToken = (id, name) => {
    return jwt.sign(
        {
            _id: id,
            id: id,
            name: name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
};

module.exports = generateToken;
