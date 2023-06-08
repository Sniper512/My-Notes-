import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	set,
	update,
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

var user_id = localStorage.getItem("user_id");
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const form = document.querySelector("#noteForm");
const title = document.querySelector("#noteTitle");
const content = document.querySelector("#noteContent");

const auth = getAuth(app);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const dt = new Date();
	const day = String(dt.getDate()).padStart(2, "0");
	const month = String(dt.getMonth() + 1).padStart(2, "0");
	const year = dt.getFullYear();
	const formattedDate = `${day}/${month}/${year}`;

	push(ref(database, "Notes/" + user_id), {
		title: title.value,
		content: content.value,
		date: formattedDate,
	});
	alert("Note added successfully");
	title.value = "";
	content.value = "";
});