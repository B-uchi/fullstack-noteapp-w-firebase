const credentials = require('./credentialss.cjs').default
const  firebase = require("firebase-admin")

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
});


module.exports = firebaseApp
