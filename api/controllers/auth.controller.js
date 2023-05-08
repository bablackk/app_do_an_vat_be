const User = require("../../models/User.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../helpers/jwt.helper");
const handleError = require("../../utils/handleError.util");

exports.SignUp = async (req, res, next) => {
  const { email, phone, password } = req.body;
  try {
    if (!email || !phone || !password)
      return next(new handleError({}, "vui lòng nhập đầy đủ thông tin!", 500));
    const checkUserUnique = await User.findOne({ email });
    if (checkUserUnique)
      return next(new handleError({}, "email đã tồn tại trong hệ thống", 422));
    const checkPhoneUnique = await User.findOne({ phone });
    if (checkPhoneUnique)
      return next(
        new handleError({}, "số điện thoại đã tồn tại trong hệ thống", 422)
      );
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      phone,
      password: hashPassword,
    });
    newUser.save();
    res.json({
      message: "tạo tài khoản thành công!",
    });
  } catch (e) {
    return next(new handleError(e, "có lỗi xảy ra!", 500));
  }
};
exports.SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return next(new handleError({}, "vui lòng nhập đầy đủ thông tin!", 500));
    const infoUser = await User.findOne({ email });
    if (!infoUser)
      return next(new handleError({}, "không tìm thấy người dùng", 422));
    const comparePassword = await bcrypt.compare(password, infoUser.password);
    if (!comparePassword)
      return next(new handleError({}, "sai tài khoản hoặc mật khẩu!", 500));
    const token = await generateToken({ email: infoUser.email });
    res.json({
      message: "Đăng nhập thành công!",
      email,
      phone: infoUser.phone,
      role: infoUser.role,
      token,
    });
  } catch (e) {
    return next(new handleError(e, "có lỗi xảy ra"));
  }
};
exports.getProfile = async (req, res, next) => {
  const { infoUser } = res.locals;
  try {
    if (!infoUser)
      return next(new handleError({}, "Không thể tìm thấy người dùng!", 409));

    const { fullname, district, city, road, email, phone, ...others } =
      infoUser._doc;
    console.log(fullname, district, city);
    res.json({
      message: "lấy dữ liệu thành công!",
      fullname,
      email,
      phone,
      district,
      city,
      road,
    });
  } catch (e) {
    return next(new handleError(e, "Có lỗi xảy ra tại server!", 500));
  }
};
exports.editProfile = async (req, res, next) => {
  const { infoUser } = res.locals;
  const { fullname, phone, district, city, road } = req.body;
  try {
    if (!fullname || !phone || !district || !city || !road)
      return next(new handleError({}, " vui lòng nhập đầy đủ thông tin", 500));
    if (!infoUser)
      return next(new handleError({}, "không tìm thấy người dùng", 422));
    const updateInfoUser = await User.findOneAndUpdate(
      {
        email: infoUser.email,
      },
      {
        fullname,
        phone,
        district,
        city,
        road,
      },
      { new: true }
    );
    res.json({
      message: "cập nhật dữ liệu thành công!",
    });
  } catch (e) {
    return next(new handleError(e, "có lỗi xảy ra!", 500));
  }
};
