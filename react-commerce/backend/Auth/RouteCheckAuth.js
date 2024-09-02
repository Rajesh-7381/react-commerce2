const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
     // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    
    // Check if the Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1]; //remove the Bearer and shown only token
    try {
        // const verified = jwt.verify(token, 'dummy text');
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // Extract the role from the verified token
        const { role } = verified;
        // Check if the role is 'admin'
        if (role === 'admin' || role ==='subadmin' ) {
            // If the role is admin, proceed to the next middleware
            next();
        }else if(role === 'user'){
            return res.json({message:"Acess denied!"})
            // next();
        }else {
            
            return res.status(403).json({ message: 'Access denied. You do not have permission to access this resource.' });
        }
    } catch (error) {
        
        return res.status(400).json({ message: 'Invalid Token' });
    }
}
