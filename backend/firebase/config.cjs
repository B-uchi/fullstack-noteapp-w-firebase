const credentials = require('./credentials.json')
const  firebase = require("firebase-admin")

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
});


module.exports = firebaseApp
