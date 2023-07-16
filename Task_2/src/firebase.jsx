import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseconfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function registerWithEmailAndPassword(email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const token = user.getIdToken;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
      todos: [
        {
          text: "Buy groceries",
          completed: false,
          priority: 3,
        },
        {
          text: "Finish project report",
          completed: true,
          priority: 2,
        },
        {
          text: "Call mom",
          completed: false,
          priority: 1,
        },
        {
          text: "Customize the todo list 🤓",
          completed: true,
          priority: 1,
        },
      ],
    });
    return token;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

async function loginWithEmailAndPassword(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const token = user.getIdToken;
    return token;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

async function logout() {
  await signOut(auth);
}

export { registerWithEmailAndPassword, loginWithEmailAndPassword, logout, db };
