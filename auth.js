const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    console.log(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyUser(req, err) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    jwt.verify(token, getKey, {}, err);
  } catch (error) {
    err("Not Authorized");
  }
}

module.exports = verifyUser;
