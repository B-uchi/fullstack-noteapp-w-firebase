import firebaseApp from "./firebase/config.cjs";
import { User } from "./models/models.js";

export const authMiddleware = (request, response, next) => {
  const headerToken = request.headers.authorization;
  const id = request.headers.id
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
        const user = await User.findOne({ id: id });
        response.status(201).send({username: user.username});
      }
    })
    .catch(() => response.status(403).send({ message: "Could not authorize" }));
};
export default authMiddleware;
