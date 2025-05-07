import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail,} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"; 

const firebaseConfig = {
  apiKey: "AIzaSyBwRSBKFB9-cJPIPvRUpuFTapDPxFqMKFM",
  authDomain: "sign-b31f0.firebaseapp.com",
  projectId: "sign-b31f0",
  storageBucket: "sign-b31f0.firebasestorage.app",
  messagingSenderId: "601445479271",
  appId: "1:601445479271:web:f2aed46862e44935ad75c2",
  measurementId: "G-8TWZVZ383C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const provider = new GoogleAuthProvider(); 


// Sign Up with Email/Password 
document.getElementById('signup-btn')?.addEventListener('click',(e)=>{
  e.preventDefault();
  let email=document.getElementById('signup-email').value;
  let password=document.getElementById('signup-password').value;
  createUserWithEmailAndPassword(auth, email, password)  
  .then(() => 
  { 
alert("Sign Up Successful!");   
window.location.href = "tasks.html";
})    
.catch((error) =>
{       
alert(error.message);  
}); 

})

// Login with Email/Password 
document.getElementById("login-btn")?.addEventListener("click", () => 
{  
const email = document.getElementById("login-email").value; 
const password = document.getElementById("login-password").value; 
signInWithEmailAndPassword(auth, email, password)    
.then(() => {   
alert("Login Successful!");  
window.location.href = "tasks.html";
})
.catch((error) =>
{       
lert(error.message);
});
}); 

// Continue with Google
document.getElementById("google-btn")?.addEventListener("click", () => 
{   
signInWithPopup(auth, provider)     
.then(() => 
{       
alert("Login Successful!");    
window.location.href = "tasks.html"; })  
.catch((error) =>
{  
alert(error.message);
}); 
});  

// Logout 
document.getElementById("logout-btn")?.addEventListener("click", () =>
{   
signOut(auth)
.then(() =>
{
alert("Logged Out Successfully!");
window.location.href = "index.html";
})
.catch((error) =>
{
alert(error.message);
});
}); 


// Reset Password
document.getElementById("reset-password-link")?.addEventListener("click", (e) =>
{
e.preventDefault();
const email = prompt("Please enter your email address:");
if (email) {
sendPasswordResetEmail(auth, email)
.then(() =>
{
alert("Password reset email sent! Check your inbox.");
})
.catch((error) => 
{
alert("Error: " + error.message);
});
} 
else {alert("Please enter a valid email address.");} 
}); 


// Show User Email on Welcome Page 
onAuthStateChanged(auth, (user) =>
{   if (user && window.location.pathname.includes("tasks.html")) 
{
document.getElementById("user-email").textContent = user.email;
} else if (!user && window.location.pathname.includes("tasks.html"))
{
window.location.href = "index.html";
}
}); 