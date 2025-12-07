const jwt = require("jsonwebtoken");
//checkUserMiddleware
exports.authenticateUser = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Login/Register first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in checkUserMiddleware:", error);
    return res.status(401).json({
      message: "Login/Register first",
      error: error.message,
    });
  }
};

exports.getUserId = (req) => {
  const ownerId = req.user.userId;
  return ownerId;
};
