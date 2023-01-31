const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
    //401 --> authentication error
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
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
  
};

module.exports = authenticationMiddleware;
