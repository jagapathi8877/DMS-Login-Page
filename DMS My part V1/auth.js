const users = JSON.parse(localStorage.getItem("users")) || [];

function signup(e) {
  e.preventDefault();

  const name = nameInput();
  const phone = phoneInput();
  const email = emailInput();
  const username = usernameInput();
  const password = passwordInput();
  const confirm = confirmInput();

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  if (users.some(u => u.username === username)) {
    alert("Username already exists");
    return;
  }

  users.push({ role: "user", name, phone, email, username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully");
  window.location.href = "login.html";
}

function login(e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const userId = document.getElementById("loginUserId").value;
  const password = document.getElementById("loginPassword").value;

  if (role === "admin") {
    if (userId === "admin" && password === "admin123") {
      window.location.href = "admin-dashboard.html";
    } else {
      alert("Invalid admin credentials");
    }
    return;
  }

  const user = users.find(u => u.username === userId && u.password === password);
  if (!user) {
    alert("Invalid user credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "user-home.html";
}

/* Helpers */
const nameInput = () => document.getElementById("name").value.trim();
const phoneInput = () => document.getElementById("phone").value.trim();
const emailInput = () => document.getElementById("email").value.trim();
const usernameInput = () => document.getElementById("username").value.trim();
const passwordInput = () => document.getElementById("password").value;
const confirmInput = () => document.getElementById("confirmPassword").value;