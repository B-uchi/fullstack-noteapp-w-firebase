import { Note } from "../models/models.js";
import { User } from "../models/models.js";
import firebaseApp from "../firebase/config.cjs";

export const createNote = (request, response) => {
  const headerToken = request.headers.authorization;
  const user_id = request.headers.id;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  firebaseApp
    .auth()
    .verifyIdToken(token)
    .then(async () => {
      if (token) {
        const user = await User.findOne({ id: user_id });
        const title = request.body.title;
        const description = request.body.description;
        const fullDate = request.body.fullDate;
        try {
          if (title && description && fullDate) {
            const newNote = {
              title: request.body.title,
              description: request.body.description,
              date: request.body.fullDate,
            };
            const note = await Note.create(newNote);
            user["notes"].push(note);
            await user.save();
            console.log("Note created and pushed");
            return response.status(201).send("Created Successfully");
          }
          return response
              .status(400)
              .send({ message: "Pls provide all required fields" });
        } catch (error) {
          console.log(error.message);
          return response.status(500).send({ message: error.message });
        }
      }
    });
};
