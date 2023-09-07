import mongoose, { SchemaTypes } from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: { type: String, requred: true },
    description: { type: String, required: false },
    date: { type: String, required: true },
  },
  { timeStamp: true }
);

const userSchema = mongoose.Schema({
  id: {type: String, required: true},
  username: { type: String, required: true },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref : 'Note'}],
});

export const User = mongoose.model("User", userSchema);
export const Note = mongoose.model("Note", noteSchema);


