import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    person_name: String,
    person_position: String,
    person_level: String,
    selectedFile: String,
    person_lastChange: {
      type: String,
      default: "Nothing.",
    },
    //createdAt: Date,
    //below value doesnt work as intended, it always returns the time when server up
    // createdAt: {
    //   type: Date,
    //   //default: new Date(),
    // },
  },
  { timestamps: true }
);

var RecordItem = mongoose.model("recorditem", itemSchema);

export default RecordItem;
