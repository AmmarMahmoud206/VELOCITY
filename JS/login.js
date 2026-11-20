let email = document.querySelector("#email");
let password = document.querySelector("#password");
let Loginbtn = document.querySelector("#Login");

let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

// Custom Message
function showMessage(title, message) {
  let overlay = document.createElement("div");

  overlay.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4";

  overlay.innerHTML = `
        <div class="w-full max-w-md rounded-xl border border-white/10 bg-[#1C2732] p-8 text-center shadow-2xl">

            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-4xl text-red-500">
                !
            </div>

            <h2 class="mb-3 text-2xl font-semibold text-[#F5F5F5]">
                ${title}
            </h2>

            <p class="mb-7 text-gray-400">
                ${message}
            </p>

            <button id="messageOK" class="rounded-md bg-[#FF5A1F] px-8 py-3 font-medium text-white transition hover:bg-[#E64A19]">
                OK
            </button>
        </div>
    `;

  document.body.appendChild(overlay);

  document.querySelector("#messageOK").addEventListener("click", function () {
    overlay.remove();
  });
}

// Form Fields
let fields = [
  { input: email, name: "Email" },
  { input: password, name: "Password" },
];

// Remove Error When Typing
fields.forEach((field) => {
  field.input.addEventListener("input", function () {
    field.input.classList.remove("border-red-500", "ring-2", "ring-red-500");

    let error = field.input.parentElement.querySelector(".field-error");

    if (error) {
      error.remove();
    }
  });
});

// Login Button
Loginbtn.addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelectorAll(".field-error").forEach((error) => error.remove());

  fields.forEach((field) => {
    field.input.classList.remove("border-red-500", "ring-2", "ring-red-500");
  });

  let firstEmptyField = null;

  fields.forEach((field) => {
    if (field.input.value.trim() === "") {
      field.input.classList.add("border-red-500", "ring-2", "ring-red-500");

      let error = document.createElement("p");
      error.className = "field-error mt-1 text-sm text-red-500";
      error.textContent = field.name + " is required.";

      field.input.insertAdjacentElement("afterend", error);

      if (!firstEmptyField) {
        firstEmptyField = field.input;
      }
    }
  });

  if (firstEmptyField) {
    firstEmptyField.focus();
    return;
  }

  if (
    getEmail &&
    getPassword &&
    getEmail.trim() === email.value.trim() &&
    getPassword.trim() === password.value.trim()
  ) {
    localStorage.setItem("loggedIn", "true");
    window.location = "index.html";
  } else {
    showMessage("Login Failed", "Invalid email or password.");
  }
});
