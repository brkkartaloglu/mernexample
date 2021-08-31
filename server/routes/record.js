import express from "express";

import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/records.js";

const router = express.Router();

router.get("/", getRecords);
router.get("/:id", getRecord);
router.post("/", createRecord);
router.patch("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
