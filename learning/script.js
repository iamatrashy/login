import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF2O-vrfHqyAh6Ap4EN7_Jz4KutAlquM4",
  authDomain: "loginpage-ec11f.firebaseapp.com",
  projectId: "loginpage-ec11f",
  storageBucket: "loginpage-ec11f.firebasestorage.app",
  messagingSenderId: "183309341821",
  appId: "1:183309341821:web:4cd9943ee0f9d9bbce8d14",
  measurementId: "G-291S857WWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle sign up button click
document.getElementById("signupbtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value.trim();

  if (!username || !email || !password || !role) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "users"), {
      username,
      email,
      password, // ⚠️ Do NOT store raw passwords in production
      role,
      createdAt: new Date()
    });

    alert("User signed up! ID: " + docRef.id);

    // Optional: clear the form
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("role").value = "";

  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Something went wrong while signing up.");
  }
});
