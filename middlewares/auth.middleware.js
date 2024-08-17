const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

module.exports = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) return res.status(403).send("Invalid token!");
      let verified = await verifyToken(req, token);

      if (verified?.isErr) {
        throw verified.err;
      } else {
        req.user = verified;
        return next();
      }
    } catch (error) {
      return res.send({
        status: false,
        statusCode: 500,
        message: "unauthorized!",
      });
    }
  };
};

async function verifyToken(req, token) {
  let userInfo = {};
  userInfo = await verifyUserAccessToken(token.replace("Bearer ", ""));

  if (!userInfo.isErr) {
    req.user = userInfo;
  }
  return userInfo;
}

async function verifyUserAccessToken(accessToken) {
  return new Promise((resolve, reject) => {
    return jwt.verify(accessToken, jwt_secret, function (err, decode) {
      if (err) return resolve({ isErr: true, err });
      return resolve({
        id: decode.userId,
        email: decode.email,
      });
    });
  });
}
