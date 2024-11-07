import { Router } from 'express';
import { bookAppointment, getAppointment } from "../controllers/appointments.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/appointments').post(bookAppointment);
router.route('/appointments').get(verifyJWT,getAppointment);

export default router