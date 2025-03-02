const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const secret = process.env.SECRET;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("No token provided or invalid format!");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error(`Error in verifying token: ${err.toString()}`);
      
      const error = new Error("Invalid or expired token!");
      error.status = 401;
      return next(error);
    }

    req.userId = decoded.userId;
    req.user_name = decoded.user_name;
    req.token = token;
    next();
  });
};
