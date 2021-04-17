import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
	apiKey: "AIzaSyBqjVwcIiz3KOiOnuEyPpvIpvh93d7MpwM",
	authDomain: "react-todo-aed98.firebaseapp.com",
	projectId: "react-todo-aed98",
	storageBucket: "react-todo-aed98.appspot.com",
	messagingSenderId: "417731252680",
	appId: "1:417731252680:web:20ee8eb05ad111de21b0fd"
})

export const auth = app.auth()
export const firestore = firebase.firestore();
export default app