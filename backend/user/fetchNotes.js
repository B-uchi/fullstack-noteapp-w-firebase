import { Note } from "../models/models.js";
import { User } from "../models/models.js";
import firebaseApp from "../firebase/config.cjs";

export const fetchNotes = async (request, response) => {
  const headerToken = request.headers.authorization;
  const user_id = request.headers.id;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  let notes = [];
  firebaseApp
    .auth()
    .verifyIdToken(token)
    .then(async () => {
      if (token) {
        const user = await User.findOne({ id: user_id });
        if (!notes[user.id]) {
          let note_id = user.notes;
          let temp_notes = [];
          await Promise.all(
            note_id.map(async (i, index) => {
              const note = await Note.findById(note_id[index]);
              temp_notes.push(note);
            })
          );
          notes[user.id] = temp_notes;
        }
        response.status(200).send({ notes: notes[user.id] });
      }
    });
};



export const deleteNote = async (request, response) => {
  const headerToken = request.headers.authorization;
  const user_id = request.headers.id;
  const note_id = request.body.note_id;

  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  let notes = [];
  firebaseApp
    .auth()
    .verifyIdToken(token)
    .then(async () => {
      if (token) {
        
        const note = await Note.findOneAndDelete({_id: note_id});
        console.log('Deleted note: ', note)
        response.status(200).send();
      }
    });
};

