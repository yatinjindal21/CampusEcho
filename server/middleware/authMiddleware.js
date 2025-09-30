const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ msg: 'No token, authorization denied' });
    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.authorizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role))
        return res.status(403).json({ msg: 'Forbidden: Insufficient role' });
    next();
};