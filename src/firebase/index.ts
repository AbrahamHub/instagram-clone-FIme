import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCjlEPBvoBPzdMnLAfdzlB05mKOR4nWwCQ",
  authDomain: "instagram-clone-7d713.firebaseapp.com",
  projectId: "instagram-clone-7d713",
  storageBucket: "instagram-clone-7d713.appspot.com",
  messagingSenderId: "194409465488",
  appId: "1:194409465488:web:a3ffff840e8586cc42fa15"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
