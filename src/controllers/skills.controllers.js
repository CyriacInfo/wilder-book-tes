const router = require("express").Router();
const skillsService = require("../services/skills.services");

router.get("/", async (req, res) => {
    try {
      const results = await skillsService.getMany();
      res.send(results);
    } catch (error) {
      res.status(404).send(error);
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const results = await skillsService.getOneById(id);
      res.send(results);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      await skillsService.create(req.body);
      res.send("Created");
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      await skillsService.update(id, req.body);
      res.send("Updated");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      await skillsService.delete(req.params.id);
      res.send("Wilder deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  });

  module.exports = router;