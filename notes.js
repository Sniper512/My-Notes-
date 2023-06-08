import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	set,
	update,
	onValue,
	remove,
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

function clearResults() {
	var noteList = document.getElementById("noteList");
	noteList.innerHTML = "";
}
const notesinDB = ref(database, "Notes");

onValue(notesinDB, function (snapshot) {
	if (snapshot.exists()) {
		let notesArray = Object.entries(snapshot.val());
		clearResults();
		for (let i = 0; i < notesArray.length; i++) {
			let note = notesArray[i];
			setter(note);
		}
	}
});

function setter(notes) {
	if (notes[0] == user_id) {
		onValue(ref(database, "Notes/" + user_id), function (snapshot) {
			if (snapshot.exists()) {
				let notesArray = Object.entries(snapshot.val());
				clearResults();
				for (let i = 0; i < notesArray.length; i++) {
					let note = notesArray[i];
					append(note);
				}
			}
		});
	}
}
function append(note) {
	var noteTitle = note[1].title;
	var noteContent = note[1].content;
	var date = note[1].date;

	var noteElement = document.createElement("div");
	noteElement.className = "note";

	var titleElement = document.createElement("h2");
	titleElement.textContent = noteTitle;

	var contentElement = document.createElement("p");
	contentElement.textContent = noteContent;
	var infoElement = document.createElement("div");
	infoElement.className = "note-info";
	var deleteButton = document.createElement("button");
	deleteButton.innerHTML = "&#10005;"; 
	deleteButton.className = "delete-button";
	deleteButton.style.position = "absolute";
	deleteButton.style.bottom = "5px";
	deleteButton.style.right = "5px";
	deleteButton.style.color = "white";
    

	deleteButton.addEventListener("click", function () {
		var noteRef = ref(database, "Notes/" + user_id + "/" + note[0]);
		remove(noteRef);
	});

	noteElement.appendChild(titleElement);
	noteElement.appendChild(infoElement);
	noteElement.appendChild(contentElement);
	noteElement.appendChild(deleteButton);

	var noteList = document.getElementById("noteList");
	noteList.appendChild(noteElement);

	document.getElementById("noteTitle").value = "";
	document.getElementById("noteContent").value = "";
}
