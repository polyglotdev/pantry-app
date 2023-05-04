import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_apiKEY,
authDomain: process.env.REACT_APP_FIREBASE_authDomain,
//databaseURL 
projectId: process.env.REACT_APP_FIREBASE_projectId,
storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
appId: process.env.REACT_APP_FIREBASE_appId
})

export const auth = app.auth();
export default app;