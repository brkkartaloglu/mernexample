import express from "express";
import mongoose from "mongoose";
import RecordItem from "../models/recordItem.js";

const router = express.Router();

export const getRecords = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 5; //number of posts for each page
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await RecordItem.countDocuments({}); // how many posts in database
    const records = await RecordItem.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex); //from newest to oldest posts

    res.json({
      data: records,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });

    // const recordList = await RecordItem.find();

    // res.status(200).json(recordList);
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
  const { person_name, person_position, person_level, selectedFile } = req.body;
  //const createdAt = new Date();

  const newRecordItem = new RecordItem({
    person_name,
    person_position,
    person_level,
    selectedFile,
    //createdAt,
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
  const {
    person_name,
    person_position,
    person_level,
    person_lastChange,
    // selectedFile,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedRecord = {
    person_name,
    person_position,
    person_level,
    person_lastChange,
    // selectedFile,
    _id: id,
  };

  await RecordItem.findByIdAndUpdate(id, updatedRecord, { new: true });

  res.json(updatedRecord);
};

export const deleteRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await RecordItem.findByIdAndRemove(id);

  res.json({ message: "Record deleted successfully." });
};

export const getRecordsBySearch = async (req, res) => {
  let { searchQuery, positions } = req.query;

  if (positions) {
    let rpositions = positions.split(",");
    for (let i = 0; i < rpositions.length; i++) {
      rpositions[i] = rpositions[i]
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }

    positions = rpositions.join();
  }
  try {
    const person_name = new RegExp(searchQuery, "i"); //ignore case ex: Test test TEST -> test , regex e çevirince db için arama daha kolay oluyor
    const records = await RecordItem.find({
      $or: [
        { person_name },
        { person_position: { $in: positions.split(",") } },
      ],
    }); //$or means either find me title or tag

    res.json({ data: records });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
