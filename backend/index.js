import express from "express";
import mongoose from "mongoose";
import { createUser, loginUser, signOut } from "./user/createandlogin.js";
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
app.get('/notes', fetchNotes);
app.get('/signout', signOut);


mongoose
  .connect(process.env.MongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected Sussessfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
