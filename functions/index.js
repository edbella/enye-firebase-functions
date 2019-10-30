// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

//Using npm cors
const cors = require('cors')({
  origin: true
});

//importing uuid v5
const uuidv5 = require('uuid/v5');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addUser = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    // Grab the message body parameter.
    const entry = req.body;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('entries/users/').push(entry);
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  })
});

exports.generateID = functions.database.ref('entries/users/{id}').onCreate((snapshot, context) => {
  console.log(snapshot.val());
  //const original = snapshot.val();
  //const id = context.params.id;
  //console.log(id,original);
  const dev = '0eeb94ca-3426-46ca-964d-a9bdd7d00ef0';
  var random = Math.random().toString(36).substring(7);
  const code = uuidv5('user-' + random, dev);
  return snapshot.ref.update({
    userID: code
  });
})