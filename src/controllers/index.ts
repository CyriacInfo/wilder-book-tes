import express from "express";
const mainRouter = express.Router();

import wilderController from "./wilders.controllers";
import skillsController from "./skills.controllers";

mainRouter.use("/wilders", wilderController);
mainRouter.use("/skills", skillsController);

export default mainRouter;
