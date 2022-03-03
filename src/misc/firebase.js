import firebase from  "firebase/app";
import "firebase/auth";
import "firebase/database"

const config= {
  apiKey: "AIzaSyCGcq7WzGYau36AfVZQSl49derKNC8is54",
  authDomain: "chat-web-app-babbc.firebaseapp.com",
  databaseURL: "https://chat-web-app-babbc-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-babbc",
  storageBucket: "chat-web-app-babbc.appspot.com",
  messagingSenderId: "424974434923",
  appId: "1:424974434923:web:d653c9e120be771a93272e"
};

const app= firebase.initializeApp(config);
export const auth=app.auth();
export const database=app.database();