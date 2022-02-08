import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE__STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE__MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})
 const provide = new firebase.auth.GoogleAuthProvider();
provide.addScope('https://www.googleapis.com/auth/drive');
provide.addScope('https://www.googleapis.com/auth/drive.appdata');
provide.addScope('https://www.googleapis.com/auth/drive.file');
provide.addScope('https://www.googleapis.com/auth/spreadsheets');
export const provider = provide;
export const auth = firebase.auth()
// export const provider =firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore();
export const database ={
  folders:firestore.collection('folders'),
  files:firestore.collection('files'),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc:doc=>{
    return {id:doc.id,...doc.data()}
  }
}
export const storage = firebase.storage();
export default firebase
