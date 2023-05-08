const jwt = require("jsonwebtoken");
const { EXPIRES, JWT_SECRET_KEY } = require("../../config");
const User = require("../../models/User.model");
const handleError = require("../../utils/handleError.util");

exports.CheckAuth = async (req, res, next) => {
  const handledError = new handleError({}, "vui lòng đăng nhập lại", 401);
  const authorization = req.get("Authorization");
  if (!authorization || !authorization.startsWith("Bearer"))
    return next(handledError);
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.decode(token, JWT_SECRET_KEY);
    if (!decoded) return next(handledError);
    const infoUser = await User.findOne({ email: decoded.email });
    if (!infoUser)
      return next(new handleError({}, "không tồn tại tài khoản", 401));
    res.locals.infoUser = infoUser;
    next();
  } catch (e) {
    return next(new handleError(e, "vui lòng đăng nhập lại!", 401));
  }
};
