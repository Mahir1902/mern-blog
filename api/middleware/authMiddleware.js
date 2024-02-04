const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // Instead of redirecting, send a 401 Unauthorized response
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        // Again, send a 401 Unauthorized response instead of redirecting
        res.status(401).json({ message: 'No token provided' });
    }
};


const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // Instead of redirecting, send a 401 Unauthorized response
                next()
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        // Again, send a 401 Unauthorized response instead of redirecting
        res.status(401).json({ message: 'No token provided' });
    }
}
