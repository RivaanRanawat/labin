import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCyII_BRmWs8KSEDcNpysCUs6PHNkLuosQ",
  authDomain: "labin-12825.firebaseapp.com",
  projectId: "labin-12825",
  storageBucket: "labin-12825.appspot.com",
  messagingSenderId: "584037553614",
  appId: "1:584037553614:web:d3e56df9888f64279e479f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
