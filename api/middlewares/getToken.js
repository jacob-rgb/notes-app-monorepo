const jwt = require('jsonwebtoken');

const getUserAndIdByToken = (req, res, next) => {

    try {
        const authorization = req.get('authorization');
        let token = '';
        console.log(authorization);
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7);
          }
        const validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const {id} = validToken;
        req.uid = id;

        next();
        
    } catch (error) {
        return res.status(401).json({ok:false, error: 'Unauthorized error'})
    }
}

module.exports = {
    getUserAndIdByToken
}