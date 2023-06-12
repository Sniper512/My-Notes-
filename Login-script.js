import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import {
	getDatabase,
	set,
	ref,
	update,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

const loginButton = document.getElementById("button");

loginButton.addEventListener("click", (e) => {
	e.preventDefault();
	const email = document.getElementById("form3Example3c").value;
	const password = document.getElementById("form3Example4c").value;
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const dt = new Date();
			const user = userCredential.user;
			localStorage.setItem("user_id", user.uid);
			update(ref(database, "users/" + user.uid), {
				last_login: dt.toUTCString(),
			});
			alert("User Logged In Successfully");
			window.location.href = "notes.html";
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
});
