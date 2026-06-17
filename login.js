function login(event) {
  if (event) event.preventDefault();

  let username = document.getElementById("loginUser").value;
  let password = document.getElementById("loginPass").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (username === user.username && password === user.password) {
    alert("You are signed in");

    window.location.href = "spot.html";
  } else {
    alert("Invalid username or password");
  }
}