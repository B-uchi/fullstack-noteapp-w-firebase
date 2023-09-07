import { auth } from "../firebase_auth/config.js";
import { User } from "../models/models.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const createUser = (request, response) => {
  const email = request.body.email;
  const username = request.body.username;
  const password = request.body.password;
  if (email && username && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken(true);
        if (token) {
          console.log("Created user successfully");
          const userData = { id: token.slice(0, 100), username: username };
          const user = await User.create(userData);
          response.json({ token: token });
          response.status(201);
        }
      })
      .catch((e) => {
        response.status(400).json({ error: e.message });
      });
  }
};


export const loginUser = (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken(true);
        if (token) {
          console.log("Logged in successfully");
          response.json({ token: token });
          response.status(201);
        }
      })
      .catch((e) => {
        response.status(400).json({ error: e.message });
      });
  }
};
