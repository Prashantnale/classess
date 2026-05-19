const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is invalid or expired" });
  }
};

module.exports = auth;
