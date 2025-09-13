document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('loginForm');
  const teacherInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const roomInput = document.getElementById('room');
  const courseSelect = document.getElementById('course');
  const togglePass = document.getElementById('togglePass');

  togglePass.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePass.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      togglePass.textContent = '👁️';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    document.querySelectorAll(".error").forEach(el => el.style.display = "none");
    document.querySelectorAll("input, select").forEach(el => el.classList.remove("error-border"));

    if (teacherInput.value.trim() === "") {
      showError(teacherInput, "Teacher name is mandatory");
      valid = false;
    }

    if (passwordInput.value.trim() === "") {
      showError(passwordInput, "Password is required");
      valid = false;
    }

    if (roomInput.value.trim() === "") {
      showError(roomInput, "Room number is required");
      valid = false;
    }

    if (courseSelect.value.trim() === "") {
      showError(courseSelect, "Please select a course");
      valid = false;
    }

    if (valid) {
      sessionStorage.setItem('teacherName', teacherInput.value.trim());
      sessionStorage.setItem('teacherRoom', roomInput.value.trim());
      sessionStorage.setItem('teacherCourse', courseSelect.value.trim());
      window.location.href = "dashboard.html";
    }
  });

  function showError(input, message) {
    const errorElem = input.closest(".form-group").querySelector(".error");
    errorElem.textContent = message;
    errorElem.style.display = "block";
    input.classList.add("error-border");
  }
});
