import { auth } from "../firebase_auth/config.js";
import { User } from "../models/models.js";
import firebaseApp from "../firebase/config.cjs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signOut
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
          const userData = { id: user.uid, username: username };
          const uuser = await User.create(userData);
          response.json({ token: token, id: user.uid });
          response.status(201);
        }
      })
      .catch((e) => {
        response.status(400).json({ error: e.message });
      });
  }
};

export const logOut = (request, response) => {
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
        signOut(auth).then(() => {
            response.status(200).send();
        }).catch((error) => {
            response.status(403).send({ message: error.message })
        });
        response.status(201).send({username: user.username});
      }
    })
    .catch(() => response.status(403).send({ message: "Could not authorize" }));
  
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
          response.json({ token: token, id: user.uid });
          response.status(201);
        }
      })
      .catch((e) => {
        response.status(400).json({ error: e.message });
      });
  }
};