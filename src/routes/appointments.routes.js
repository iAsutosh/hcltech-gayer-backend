import { Router } from 'express';
import { bookAppointment } from "../controllers/appointments.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/appointments').post(bookAppointment);

export default router