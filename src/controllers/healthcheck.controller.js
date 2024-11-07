import {asyncHandler} from "../utils/asyncHandler.js"


const healthcheck = asyncHandler(async (req, res) => {
    res.status(200).json({ status: "Healthy", message: "Service is operational" });
});


export {
    healthcheck
    }
    