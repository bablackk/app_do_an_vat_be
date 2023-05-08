const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, EXPIRES } = require("../config");

exports.generateToken = async (dataUser) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      dataUser,
      JWT_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: EXPIRES,
      },
      (error, token) => {
        if (error) return reject(error);
        resolve(token);
      }
    );
  });
};
