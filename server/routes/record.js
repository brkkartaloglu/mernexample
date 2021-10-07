import express from "express";

import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  getRecordsBySearch,
} from "../controllers/records.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getRecordsBySearch); //bu :id li routedan önce olmalı
router.get("/", getRecords);
router.get("/:id", getRecord);
router.post("/", auth, createRecord);
router.patch("/:id", auth, updateRecord);
router.delete("/:id", auth, deleteRecord);

export default router;
