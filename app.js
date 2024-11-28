const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
const textSlider = document.querySelector(".text-group");

let currentIndex = 1; // Start with the first image

// Add focus and blur effects to input fields
inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value !== "") return;
    inp.classList.remove("active");
  });
});

// Toggle between sign-in and sign-up forms
toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

// Sign-Up Form Handling
document.querySelector(".sign-up-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get user input
  const username = document.querySelector(".sign-up-form .input-field[type='text']").value;
  const email = document.querySelector(".sign-up-form .input-field[type='email']").value;
  const password = document.querySelector(".sign-up-form .input-field[type='password']").value;

  // Save user credentials in localStorage
  const user = { username, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Sign up successful! Please log in.");
  main.classList.remove("sign-up-mode"); // Switch to login form
});

// Sign-In Form Handling
document.querySelector(".sign-in-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get user input
  const username = document.querySelector(".sign-in-form .input-field[type='text']").value;
  const password = document.querySelector(".sign-in-form .input-field[type='password']").value;

  // Retrieve user credentials from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.username === username && storedUser.password === password) {
    // Redirect on successful login
    window.location.href = "Home/index.html"; // Change to the path of your home page
  } else {
    alert("Invalid username or password. Please try again.");
  }
});

// Slider functionality
function moveSlider(index) {
  // Update images
  images.forEach((img) => img.classList.remove("show"));
  document.querySelector(`.img-${index}`).classList.add("show");

  // Update text slider
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  // Update bullets
  bullets.forEach((bull) => bull.classList.remove("active"));
  document.querySelector(`.bullets span[data-value="${index}"]`).classList.add("active");
}

// Automatic slide functionality
function autoSlide() {
  currentIndex = (currentIndex % bullets.length) + 1; // Loop through slides
  moveSlider(currentIndex);
}

// Add click event to bullets
bullets.forEach((bullet) => {
  bullet.addEventListener("click", function () {
    currentIndex = Number(this.dataset.value); // Get index based on bullet clicked
    moveSlider(currentIndex);
  });
});

// Start automatic sliding
setInterval(autoSlide, 5000); // Change slide every 5 seconds
