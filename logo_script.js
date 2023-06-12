// Get the image element
const image = document.getElementById("image");

// Show the image
image.style.display = "block";

// Delay the transition to the next page
setTimeout(function() {
  // Redirect to the next page
  window.location.href = "sign_up.html";
}, 3000); // 3000 milliseconds = 3 seconds
