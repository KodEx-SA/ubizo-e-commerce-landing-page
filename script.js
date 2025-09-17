// Initialize AOS animations for smooth transitions
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

// Navigation links with click handling
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

// Hamburger menu toggle for mobile navigation
document.querySelector(".hamburger").addEventListener("click", () => {
  const nav = document.querySelector("nav ul");
  const hamburger = document.querySelector(".hamburger");
  const isOpen = nav.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.innerHTML = `<i class="fas ${isOpen ? "fa-times" : "fa-bars"}"></i>`;
});

// Theme toggle for light/dark mode
document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  const icon = document.querySelector(".theme-toggle i");
  icon.className = `fas ${document.body.dataset.theme === "dark" ? "fa-sun" : "fa-moon"}`;
});

// Contact form validation and submission
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

// Chat widget functionality
const chatbox = document.getElementById("chatbox");
const chatToggle = document.getElementById("chatToggle");
const sendButton = document.getElementById("sendButton");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

// Toggle chatbox visibility
function toggleChat() {
  const isOpen = chatbox.style.display === "flex";
  chatbox.style.display = isOpen ? "none" : "flex";
  chatToggle.setAttribute("aria-expanded", !isOpen);
  if (!isOpen) {
    chatInput.focus(); // Focus input when opening chat
  }
}

// Append message to chat
function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  messageElement.textContent = message;
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight; // Scroll to latest message
}

// Send message to backend and get response
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return; // Do not send empty messages

  // Display user message
  appendMessage("user", message);
  chatInput.value = "";
  chatInput.disabled = true;
  sendButton.disabled = true;

  try {
    // Show temporary typing/loading message
    const typingMessage = document.createElement("div");
    typingMessage.classList.add("chat-message", "bot", "typing");
    typingMessage.textContent = "Typing...";
    chatBody.appendChild(typingMessage);
    chatBody.scrollTop = chatBody.scrollHeight;

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    
    // Remove typing message
    chatBody.removeChild(typingMessage);

    // Display bot response
    appendMessage("bot", data.response);
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();
  } catch (error) {
    console.error("Error:", error);
    appendMessage("bot", "Sorry, there was an error. Please try again later.");
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();
  }
}

// Event listeners for chat
chatToggle.addEventListener("click", toggleChat);
sendButton.addEventListener("click", sendMessage);

// Send message with Enter key
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // Prevent line break
    sendMessage();
  }
});

// Keyboard navigation for accessibility, Enter only
document.querySelectorAll("button:not(#sendButton), a, input:not(#chatInput), textarea:not(#chatInput)").forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      el.click();
    }
  });
});