document.querySelector("#login-form").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.querySelector("#email").value;

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const user = await res.json();
  localStorage.setItem("usuario", JSON.stringify(user));

  if (user.role === "admin") {
    window.location.href = "./admin/orders.html";
  } else {
    window.location.href = "checkout.html";
  }
});