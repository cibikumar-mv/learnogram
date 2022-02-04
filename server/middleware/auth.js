import jwt from 'jsonwebtoken';

module.exports = function(req, res, next) 
{
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('NO TOKEN PROVIDED');
    try {
        const decoded = jwt.verify(token, PROCESS.ENV.PRIVATEKEY);
        req.body = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token')
    }
}