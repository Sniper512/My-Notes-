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


const noteId = localStorage.getItem("note_id");

const noteRef = ref(database, "Notes/" + user_id + "/" + noteId);
onValue(noteRef, function (snapshot) {
    if (snapshot.exists()) {
        const note = snapshot.val();
        document.getElementById("noteTitle").textContent = note.title;
        document.getElementById("noteDate").textContent = note.date;
        document.getElementById("noteContent").textContent = note.content;
    }
});

const saveButton= document.getElementById("saveButton");
saveButton.addEventListener("click", (e) => {
	e.preventDefault();
	const dt = new Date();
	const day = String(dt.getDate()).padStart(2, "0");
	const month = String(dt.getMonth() + 1).padStart(2, "0");
	const year = dt.getFullYear();
	const formattedDate = `${day}/${month}/${year}`;
	update(ref(database, "Notes/" + user_id + "/" + noteId), {
		title: document.getElementById("noteTitle").textContent,
		content: document.getElementById("noteContent").textContent,
		date: formattedDate,
	});
	alert("Note updated successfully");
});
