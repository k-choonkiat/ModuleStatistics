import Firebase from "firebase";

let config = {
  apiKey: "AIzaSyC5tpD6N9zJT3V-xHHqAdrBwKuEfE25GKo",
  authDomain: "bt3103-f9af7.firebaseapp.com",
  databaseURL: "https://bt3103-f9af7.firebaseio.com",
  projectId: "bt3103-f9af7",
  storageBucket: "bt3103-f9af7.appspot.com",
  messagingSenderId: "1059333989137"
};

let app = Firebase.initializeApp(config);

// let db = app.database();
//let testref = db.ref();

export const db = app.database(); // export for other components to use
export const modsInfo = db.ref("mods_info/data");
export const seRef = db.ref("seRef/data");