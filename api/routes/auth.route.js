const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const { Router } = require("express");

const router = Router();

router.post("/login", AuthController.SignIn);
router.post("/register", AuthController.SignUp);
router.get("/get/profile", AuthMiddleware.CheckAuth, AuthController.getProfile);
router.put(
  "/edit/profile",
  AuthMiddleware.CheckAuth,
  AuthController.editProfile
);

module.exports = router;
