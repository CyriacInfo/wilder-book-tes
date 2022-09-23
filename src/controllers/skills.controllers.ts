import express, { Request, Response } from "express";
import { Skills } from "../models/skills.models";
import skillsService from "../services/skills.services";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const results: Skills[] = await skillsService.getMany();
    res.send(results);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const results = await skillsService.getOneById(id);
    res.send(results);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newSkill: Skills = req.body;
  try {
    const result: Skills = await skillsService.create(newSkill);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await skillsService.update(id, req.body);
    res.send("Updated");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await skillsService.delete(id);
    res.send("Skills deleted");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
