const balloonContainer = document.getElementById("balloon-container");
const bubbleContainer = document.getElementById("text-bubble-container");

let bubbleMessages = [];

// Create a balloon
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.animationDuration = (Math.random() * 3 + 3) + "s";
  balloon.innerHTML = "🎈";
  balloonContainer.appendChild(balloon);
  setTimeout(() => balloon.remove(), 6000);
}

// Create a floating text bubble
function createTextBubble(message) {
  const bubble = document.createElement("div");
  bubble.classList.add("text-bubble");
  bubble.innerText = message;
  bubble.style.left = Math.random() * 80 + "vw";
    bubble.style.top = Math.random() * 80 + "vh";
    bubble.style.transform = "none";
  bubbleContainer.appendChild(bubble);
  setTimeout(() => bubble.remove(), 5000);
}

// Submit a new wish to Firebase
function submitWish() {
  const input = document.getElementById("wishInput");
  const message = input.value.trim();
  if (message !== "") {
    firebase.database().ref("wishes").push({ message });
    input.value = "";
  }
}

// Listen for new wishes in real time
firebase.database().ref("wishes").on("child_added", (snapshot) => {
  const msg = snapshot.val().message;
  bubbleMessages.push(msg);
  // createTextBubble(msg);
});

// Optional: Keep generating random wishes
setInterval(() => {
  if (bubbleMessages.length > 0) {
    const msg = bubbleMessages[Math.floor(Math.random() * bubbleMessages.length)];
    createTextBubble(msg);
  }
}, 3000);

// Balloons keep floating
setInterval(createBalloon, 300);
