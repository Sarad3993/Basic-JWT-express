const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors/index");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  // [1] means 2nd value i.e token as [0] is string 'Bearer'

  // now verify the validity of the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    // since we want to pass it to the next middleware , we create a new object i.e user object on the request 
    next(); // pass to next middleware i.e dashboard
  } 
  catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
    // no need to pass status code separately here as it is already passed in unauthenticated.js
  }
  
};

module.exports = authenticationMiddleware;
