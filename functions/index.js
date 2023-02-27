/* eslint-disable max-len */
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

const serviceAccount = require("./locality-tradesmen-firebase-adminsdk-pvsaq-65e8e234ef.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://locality-tradesmen-default-rtdb.firebaseio.com",
});

exports.removeTradesman = functions.firestore.document("/usersList/provider/children/{uid}")
    .onDelete((snapshot, context) => {
      return admin.auth().deleteUser(context.params.uid);
    });
exports.removeUser = functions.firestore.document("/usersList/user/children/{uid}")
    .onDelete((snapshot, context) => {
      return admin.auth().deleteUser(context.params.uid);
    });
