import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	set,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const appSettings = {
	databaseURL:
		"https://numgeeks-default-rtdb.asia-southeast1.firebasedatabase.app",
};
const firebaseConfig = {
	apiKey: "AIzaSyDIYCt_rworca5ifh1Gu9VkzbCjcmm_4-Y",
	authDomain: "numgeeks.firebaseapp.com",
	databaseURL:
		"https://numgeeks-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "numgeeks",
	storageBucket: "numgeeks.appspot.com",
	messagingSenderId: "422474262865",
	appId: "1:422474262865:web:9b7d2e8feff09088c40b70",
	measurementId: "G-GL42X37FDE",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const button = document.getElementById("button");
button.addEventListener("click", (e) => {
	e.preventDefault();
	const email = document.getElementById("form3Example3c").value;
	const password = document.getElementById("form3Example4c").value;
	const username = document.getElementById("form3Example1c").value;

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			var user = userCredential.user;
			const dt = new Date();
			set(ref(database, "users/" + user.uid), {
				username: username,
				email: email,
				password: password,
				last_login: dt.toUTCString(),
			});
			signInWithEmailAndPassword(auth, email, password).then(
				(userCredential) => {
					var user = userCredential.user;
					localStorage.setItem("user_id", user.uid);
					alert("Signed in");
					window.location.href = "notes.html";
				}
			);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
});
