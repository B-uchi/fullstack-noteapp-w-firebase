import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { createUser, loginUser } from "./user/createandlogin.js";
import { createNote } from "./user/createNote.js";
import authMiddleWare from "./authentication_middleware.js";
import cors from "cors";
import { fetchNotes } from "./user/fetchNotes.js";

const app = express();
app.use(cors());
app.get("/dashboard", authMiddleWare);
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Successful");
});

app.post("/register", createUser);
app.post("/login", loginUser);
app.post("/notes", createNote);
app.get('/notes', fetchNotes)

// app.get('/notes', async (request, response)=>{
//     try {
//         const notes = await Note.find({});
//         return response.status(200).json(notes)
//     } catch (error) {
//         console.log(error.message)
//     }
// })

mongoose
  .connect(MongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected Sussessfully");
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
