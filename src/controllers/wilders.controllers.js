const router = require("express").Router();
const wilderService = require("../services/wilders.services");
router.get("/", async (req, res) => {
  try {
    const results = await wilderService.getMany();
    res.send(results);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const results = await wilderService.getOneById(id);
    res.send(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await wilderService.create(req.body);
    res.send("Created");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await wilderService.update(id, req.body);
    res.send("Updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await wilderService.delete(req.params.id);
    res.send("Wilder deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/:id/:skillId", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const skillId = parseInt(req.params.skillId, 10);
    await wilderService.addSkill(id, skillId);
    res.send("skill added");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id/:skillId", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const skillId = parseInt(req.params.skillId, 10);
    await wilderService.removeSkill(id, skillId);
    res.send("skill removed");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
