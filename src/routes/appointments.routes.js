import { Router } from 'express';
import { bookAppointment, getAppointment } from "../controllers/appointments.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import roleMiddleware from '../middlewares/role.middleware.js'

const router = Router();

router.route('/appointments').post(bookAppointment);
router.route('/appointments').get(verifyJWT,roleMiddleware(['doctor','patient']),getAppointment);

export default router