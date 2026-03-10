const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const bearertoken = req.headers.authorization;

        // check token
        if (!bearertoken) {
            return res.status(403).json({ message: 'You are not authorized' })
        }

        const token = bearertoken.split(' ')[1];

        // check the token valid
        const key = "eventbookingwebsiteklkjkkwewkkvjdwemeqwewejjcggfhokjijihuvfhbhgu345j55weewewenmojok";

        const decodedToken = jwt.verify(token, key);
        req.userId = decodedToken.id;

        next();
    } catch (error) {
        return res.status(403).json({ message: 'You are not authorized' })
    }
}
