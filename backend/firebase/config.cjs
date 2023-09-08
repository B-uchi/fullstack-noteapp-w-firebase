const  firebase = require("firebase-admin")

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert({
  "type": "service_account",
  "project_id": "mern-note-server",
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.client_x509_cert_url,
  "universe_domain": "googleapis.com"
}),
});


module.exports = firebaseApp
