import firebase from 'firebase'

const firebaseConfig = {
    // your firebase config
  apiKey: "AIzaSyC3YpYIqX4mPAShgCFDzThY-TzbbmTTYc4",
  authDomain: "dicord-clone-live.firebaseapp.com",
  projectId: "dicord-clone-live",
  storageBucket: "dicord-clone-live.appspot.com",
  messagingSenderId: "120276066794",
  appId: "1:120276066794:web:abee7844d2ac8d152f9293"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db