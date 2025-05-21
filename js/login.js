document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("login-status");

  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      // تخزين التوكن واسم المستخدم في localStorage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("username", username);

      status.textContent = "تم تسجيل الدخول بنجاح!";
      status.style.color = "green";

      // توجيه المستخدم إلى صفحة index.html
      window.location.href = "../index.html";
    } else {
      status.textContent = "فشل في تسجيل الدخول. تحقق من البيانات.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "حدث خطأ أثناء الاتصال بالخادم.";
    status.style.color = "red";
    console.error("Login error:", error);
  }
});
function updateUsernameDisplay() {
  const username = localStorage.getItem("username");
  const usernameDisplay = document.getElementById("username-display");
  const loginButtons = document.querySelectorAll(".loginBtn");
  const logoutBtn = document.getElementById("logout-btn");

  if (usernameDisplay) {
    if (username) {
      usernameDisplay.innerHTML = ` <i class="fa-solid fa-user" style="color: #ffffff;"></i> ${username}`;
      loginButtons.forEach((btn) => {
        btn.style.display = "none";
      });
      if (logoutBtn) {
        logoutBtn.style.display = "inline";
      }
    } else {
      loginButtons.forEach((btn) => {
        btn.style.display = "inline";
      });
      if (logoutBtn) {
        logoutBtn.style.display = "none";
      }
    }
  } else {
    console.error("لم يتم العثور على عنصر #username-display في الصفحة.");
  }

  if (loginButtons.length === 0) {
    console.warn("لم يتم العثور على أي أزرار بكلاس .loginBtn في الصفحة.");
  }
}