const admin = require('firebase-admin');
//const functions = require('firebase-functions');

var uuid = 'wjWpYZlhVqSbI8pTwBSjwwpgYw83';
var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

var db = admin.firestore();

var usersRef = db.collection('users');

/*usersRef.get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });*/

user = usersRef.doc(uuid)
user.get()
    .then(doc => {
      if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc.data());
        }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
