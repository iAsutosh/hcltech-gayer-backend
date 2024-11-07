// roleMiddleware.js
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        console.log(userRole)
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

export default roleMiddleware;
