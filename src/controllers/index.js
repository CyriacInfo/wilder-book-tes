const mainRouter = require("express").Router();

const wilderController = require('./wilders.controllers');
const skillsController = require('./skills.controllers');

mainRouter.use('/wilders', wilderController);
mainRouter.use('/skills', skillsController);

module.exports = mainRouter;