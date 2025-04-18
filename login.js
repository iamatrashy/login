import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js"; 
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
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

// Handle login
document.getElementById("button").addEventListener("click", async () => {
  const email = document.getElementById("usrnam").value.trim();
  const password = document.getElementById("pass").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), where("password", "==", password));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0].data(); // Get user data from the first matched document
      const username = userDoc.username;
      const role = userDoc.role;

      // Store username and role in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      alert("Login successful!");
      window.location.href = "index.html"; // Redirect after login
    } else {
      alert("Invalid email or password.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Error during login.");
  }
});
