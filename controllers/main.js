// JWT
// check username, password in post(login) request
// if exist create a new JWT and send back to front-end
// setup the authentication so that only the request with JWT can access the dashboard(resource)

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
    // 400--> Bad request
  }

  //normally we send id of databse(actual) in payload while signing jwt but here we are not using database so we sent a dummy id as Date and a username too. never send password in payload(i repeat never)

  // always try to keep the payload small, don't send too many data in payload as it is not good for user experience eg: for someone with bad internet connection

  // for secret key in production websites, always use long, complex and unguessable string value. here I have used simple key just for demo purpose

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};


//functionality(resources that is going to be asccssed after successful login)
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};



module.exports = { login, dashboard };
