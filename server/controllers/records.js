import express from "express";
import mongoose from "mongoose";
import RecordItem from "../models/recordItem.js";

const router = express.Router();

export const getRecords = async (req, res) => {
  try {
    const recordList = await RecordItem.find();

    res.status(200).json(recordList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const recordItem = await RecordItem.findById(id);

    res.status(200).json(recordItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRecord = async (req, res) => {
  const { person_name, person_position, person_level } = req.body;
  console.log(person_name);
  const newRecordItem = new RecordItem({
    person_name,
    person_position,
    person_level,
  });

  try {
    await newRecordItem.save();

    res.status(201).json(newRecordItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRecord = async (req, res) => {
  const { id } = req.params;
  const { person_name, person_position, person_level } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedRecord = { person_name, person_position, person_level, _id: id };

  await RecordItem.findByIdAndUpdate(id, updatedRecord, { new: true });

  res.json(updatedRecord);
  console.log("editte backend", updatedRecord);
};

export const deleteRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await RecordItem.findByIdAndRemove(id);

  res.json({ message: "Record deleted successfully." });
};

export default router;
