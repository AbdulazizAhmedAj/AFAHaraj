const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    console.log({token})

    if (!token) {
        return res.status(401).redirect('/login'); 
    }

    try {
        const decoded = jwt.verify(token, 'mySuperSecret');
        req.user = decoded; 
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).redirect('/login'); 
    }
};

module.exports = authenticate;
