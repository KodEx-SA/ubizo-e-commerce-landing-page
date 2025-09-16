// Initialize AOS animations
AOS.init({
  duration: 800,
  once: true,
});

// Smooth scroll to section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Update active navigation link
function setActiveLink(sectionId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    }
  });
}

// Navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("href").substring(1);
    scrollToSection(sectionId);
    setActiveLink(sectionId);
    // Close mobile menu if open
    document.querySelector("nav ul").classList.remove("active");
    document.querySelector(".hamburger").setAttribute("aria-expanded", "false");
    document.querySelector(".hamburger").innerHTML = `<i class="fas fa-bars"></i>`;
  });
});

// Hamburger menu toggle
document.querySelector(".hamburger").addEventListener("click", () => {
  const nav = document.querySelector("nav ul");
  const hamburger = document.querySelector(".hamburger");
  const isOpen = nav.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.innerHTML = `<i class="fas ${isOpen ? "fa-times" : "fa-bars"}"></i>`;
});

// Theme toggle
document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  const icon = document.querySelector(".theme-toggle i");
  icon.className = `fas ${document.body.dataset.theme === "dark" ? "fa-sun" : "fa-moon"}`;
});

// Form validation and submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Clear previous errors
  document.querySelectorAll(".error-message").forEach((error) => (error.textContent = ""));

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  let isValid = true;

  // Name validation
  if (name.length < 2) {
    document.getElementById("name-error").textContent = "Name must be at least 2 characters long";
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address";
    isValid = false;
  }

  // Message validation
  if (message.length < 10) {
    document.getElementById("message-error").textContent = "Message must be at least 10 characters long";
    isValid = false;
  }

  if (isValid) {
    const submitBtn = document.getElementById("submit-btn");
    const loader = document.getElementById("form-loader");
    
    submitBtn.disabled = true;
    loader.classList.remove("hidden");

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for contacting us! We'll get back to you soon.");
      document.getElementById("contact-form").reset();
      submitBtn.disabled = false;
      loader.classList.add("hidden");
    }, 1500);
  }
});

// Keyboard navigation for accessibility
document.querySelectorAll("button, a, input, textarea").forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      el.click();
    }
  });
});

// Intersection Observer for active state on scroll
const sections = document.querySelectorAll("section[id]");
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute("id");
      setActiveLink(sectionId);
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// toggle chat
function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
}

// chat widget - send message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    const text = input.value.trim();

    if(text) {
        let _userMsg = document.createElement('div'); // create a user-msg element
        _userMsg.className = "chat-message user";
        _userMsg.textContent = text;
        body.appendChild(_userMsg);

        // implementation bot reply
        setTimeout(() => {
            let _botMsg = document.createElement('div');
            _botMsg.className = "chat-message bot";
            _botMsg.textContent = "✅ Thanks for your message! Our team will reply shortly.";
            body.appendChild(_botMsg);
            body.scrollTop = body.scrollHeight;
        }, 1000);

        input.value = "";
        body.scrollTop = body.scrollHeight;
    }
}