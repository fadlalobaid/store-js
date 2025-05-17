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

      // تخزين التوكن مثلاً في localStorage
      localStorage.setItem("auth_token", token);

      status.textContent = "تم تسجيل الدخول بنجاح!";
      status.style.color = "green";

      // توجيه المستخدم إلى صفحة أخرى مثل dashboard
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
