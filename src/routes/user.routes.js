import { Router } from "express";
import { 
    loginUser, 
    registerUser,
    getDoctorsBySpecialization
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    registerUser
    )
router.route("/login").post(loginUser)
//secured routes
router.route("/doctors/slots").get(verifyJWT,  getDoctorsBySpecialization)


export default router