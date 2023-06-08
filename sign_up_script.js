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
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const username = document.getElementById("username").value;
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			var user = userCredential.user;
			const dt=new Date();
			set(ref(database, "users/"+user.uid), {
				username: username,
				email: email,
				password: password,
				last_login: dt.toUTCString(),
			});
			signInWithEmailAndPassword(auth, email, password).then(
				(userCredential) => {
					var user = userCredential.user;
                    localStorage.setItem("user_id", user.uid);
					alert("signed in");
					window.location.href="notes.html";
				}
			);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
});



// onValue(notesinDB, function (snapshot) {
// 	if (snapshot.exists()) {
// 		let notesArray = Object.entries(snapshot.val());
// 		clearResult();
// 		for (let i = 0; i < notesArray.length; i++) {
// 			let note = notesArray[i];
// 			apppend(note);
// 		}
// 	}
// });

// function append(note) {
// 	// Get the values from the input fields
// 	var noteTitle = document.getElementById("noteTitle").value;
// 	var noteContent = document.getElementById("noteContent").value;

// 	// Create a new note element
// 	var noteElement = document.createElement("div");
// 	noteElement.className = "note";

// 	// Create heading element for the title
// 	var titleElement = document.createElement("h2");
// 	titleElement.textContent = noteTitle;

// 	// Create paragraph element for the note content
// 	var contentElement = document.createElement("p");
// 	contentElement.textContent = noteContent;

// 	// Append the title and content to the note element
// 	noteElement.appendChild(titleElement);
// 	noteElement.appendChild(contentElement);

// 	// Append the note element to the note list
// 	var noteList = document.getElementById("noteList");
// 	noteList.appendChild(noteElement);

// 	// Reset the form fields
// 	document.getElementById("noteTitle").value = "";
// 	document.getElementById("noteContent").value = "";
// }
// function clearResult() {
// 	result.innerHTML = "";
// }

// function apppend(book) {
// 	const li = document.createElement("li");
// 	const bookID = book[0];
// 	const bookName = book[1];

// 	const cross = document.createElement("span");
// 	cross.innerHTML = "&#10005;";
// 	cross.style.color = "white";
// 	cross.style.marginRight = "0.5rem";
// 	cross.style.cursor = "pointer";

// 	cross.addEventListener("click", () => {
// 		remove(ref(database, "Books/" + bookID));
// 	});

// 	li.appendChild(cross);
// 	li.appendChild(document.createTextNode(bookName));
// 	li.style.display = "inline-block";
// 	li.style.outline = "none";
// 	li.style.marginRight = "0.7rem";
// 	li.style.marginTop = "0.5rem";
// 	li.style.padding = "0.5rem 1rem";
// 	li.style.borderRadius = "0.3rem";
// 	li.style.color = "white";
// 	li.style.backgroundColor = "green";

// 	li.addEventListener("mouseover", () => {
// 		li.style.color = "green";
// 		li.style.backgroundColor = "white";
// 		li.style.cursor = "pointer";
// 		cross.style.color = "green";
// 	});

// 	li.addEventListener("mouseout", () => {
// 		li.style.color = "white";
// 		li.style.backgroundColor = "green";
// 		li.style.cursor = "default";
// 		cross.style.color = "white";
// 	});

// 	li.style.transition = "all 0.3s ease";

// 	result.appendChild(li);
// }
