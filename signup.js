function signup() {
  let username = document.getElementById("signupUser").value;
  let password = document.getElementById("signupPass").value;

  console.log("Signup clicked");

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({ username, password })
  );

  alert("Signup successful");

  // 🔥 force redirect
  window.location.replace("login.html");
}