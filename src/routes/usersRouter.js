import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controlllers.js";
import { passportCall, passportCallRedirect } from "../middlewares/sessions.js";
import { checkAuth } from "../middlewares/auth.js";
//import { checkAuth } from "../jwt/auth.js";

const controller = new UserController();
const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/profile-github", passport.authenticate("github", { scope: ["user:email"] }), controller.github);
router.get("/perfil", checkAuth, controller.perfil);
router.post("/logout", controller.logout);


export default router;
