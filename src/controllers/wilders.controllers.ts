const router = require("express").Router();
import { Request, Response } from "express";
import wilderService from "../services/wilders.services";

router.get("/", async (req: Request, res: Response) => {
  try {
    const results = await wilderService.getMany();
    res.status(200).send(results);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const results = await wilderService.getOneById(id);
    res.send(results);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { skills, name, description } = req.body;
  try {
    const wilder = await wilderService.create({ name, description });
    if (skills.length > 0) {
      for (const skill of skills) {
        await wilderService.addSkill(wilder.id, skill.id);
      }
    }
    const results = await wilderService.getOneById(wilder.id);
    res.send(results);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, description, updateSkills } = req.body;
    const wilder = {
      name,
      description,
    };
    await wilderService.update(id, wilder);
    await wilderService.deleteAllSkills(id);
    for (const skill of updateSkills) {
      await wilderService.addSkill(id, skill.id);
    }
    const result = await wilderService.getOneById(id);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await wilderService.delete(id);
    res.send("Wilder deleted");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post("/:id/addskills", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { skills } = req.body;
    await Promise.all(
      skills.map((skillId: number) => {
        wilderService.addSkill(id, skillId);
      })
    );
    res.send("Skills added");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
router.delete("/:id/:skillId", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const skillId = parseInt(req.params.skillId, 10);
    await wilderService.removeSkill(id, skillId);
    res.send("skills removed from wilder");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
export default router;
