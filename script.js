// Initialize AOS animations for smooth transitions
AOS.init({
  duration: 800,
  once: true,
});

// Header scroll effect
function handleHeaderScroll() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll);

// Initialize Splide carousels
document.addEventListener('DOMContentLoaded', function() {
  // Benefits Carousel
  if (typeof Splide !== 'undefined') {
    const benefitsCarousel = new Splide('.benefits-carousel', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '1rem',
      autoplay: true,
      interval: 4000,
      pauseOnHover: true,
      arrows: true,
      pagination: true,
      breakpoints: {
        991: {
          perPage: 2,
          gap: '0.75rem'
        },
        768: {
          perPage: 1,
          gap: '0.5rem'
        }
      }
    }).mount();

    // Testimonials Carousel
    const testimonialsCarousel = new Splide('.testimonials-carousel', {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      gap: '2rem',
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      arrows: true,
      pagination: true,
      padding: {
        left: '2rem',
        right: '2rem'
      }
    }).mount();
  }
});

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  }
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
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const hamburger = document.querySelector(".hamburger");
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.innerHTML = `<i class="fas fa-bars"></i>`;
    }
  });
});

// Hamburger menu toggle for mobile navigation
document.querySelector(".hamburger").addEventListener("click", (e) => {
  e.stopPropagation();
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const hamburger = document.querySelector(".hamburger");
  const isOpen = navbarCollapse.classList.contains('show');
  
  if (isOpen) {
    navbarCollapse.classList.remove('show');
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = `<i class="fas fa-bars"></i>`;
  } else {
    navbarCollapse.classList.add('show');
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.innerHTML = `<i class="fas fa-times"></i>`;
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const hamburger = document.querySelector(".hamburger");
  
  if (navbarCollapse.classList.contains('show') && 
      !navbarCollapse.contains(e.target) && 
      !hamburger.contains(e.target)) {
    navbarCollapse.classList.remove('show');
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = `<i class="fas fa-bars"></i>`;
  }
});

// Theme toggle for light/dark mode
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const currentTheme = document.body.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.dataset.theme = newTheme;
  
  const icon = document.querySelector(".theme-toggle i");
  icon.className = `fas ${newTheme === "dark" ? "fa-sun" : "fa-moon"}`;
  
  // Save theme preference
  localStorage.setItem('theme', newTheme);
});

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = savedTheme;
  const icon = document.querySelector(".theme-toggle i");
  icon.className = `fas ${savedTheme === "dark" ? "fa-sun" : "fa-moon"}`;
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
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    loader.classList.remove("hidden");

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for contacting us! We'll get back to you soon.");
      document.getElementById("contact-form").reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message';
      loader.classList.add("hidden");
    }, 1500);
  }
});

// Enhanced Intersection Observer for active state on scroll
const sections = document.querySelectorAll("section[id]");
let currentActiveSection = 'home';

const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -40% 0px", // Trigger 20% before section starts, 40% after it ends
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute("id");
      if (sectionId !== currentActiveSection) {
        currentActiveSection = sectionId;
        setActiveLink(sectionId);
        
        // Update URL hash without page reload
        if (history.pushState) {
          history.pushState(null, null, `#${sectionId}`);
        }
      }
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach((section) => observer.observe(section));

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    setActiveLink(hash);
    scrollToSection(hash);
  } else {
    setActiveLink('home');
    scrollToSection('home');
  }
});

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
  chatbox.setAttribute("aria-hidden", isOpen);
  
  if (!isOpen) {
    // Focus input when opening chat with a small delay
    setTimeout(() => {
      chatInput.focus();
    }, 300);
  }
}

// Append message to chat
function appendMessage(sender, message, isTyping = false) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  
  if (isTyping) {
    messageElement.classList.add("typing");
  }
  
  messageElement.textContent = message;
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight;
  
  return messageElement; // Return for potential removal (typing indicator)
}

// Send message to backend and get response
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Display user message
  appendMessage("user", message);
  chatInput.value = "";
  chatInput.disabled = true;
  sendButton.disabled = true;
  sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  try {
    // Show temporary typing indicator
    const typingIndicator = appendMessage("bot", "Typing...", true);

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    
    // Remove typing indicator
    chatBody.removeChild(typingIndicator);

    // Display bot response
    appendMessage("bot", data.response || "Thanks for your message! Our team will reply shortly.");
    
  } catch (error) {
    console.error("Chat Error:", error);
    
    // Remove typing indicator on error
    if (document.querySelector('.chat-message.typing')) {
      chatBody.removeChild(document.querySelector('.chat-message.typing'));
    }
    
    appendMessage("bot", "Sorry, I'm having trouble connecting right now. Please try again later.");
  } finally {
    chatInput.disabled = false;
    sendButton.disabled = false;
    sendButton.innerHTML = '➤';
    chatInput.focus();
  }
}

// Event listeners for chat
chatToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleChat();
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  sendMessage();
});

// Send message with Enter key
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
  if (chatbox.style.display === "flex" && 
      !chatbox.contains(e.target) && 
      !chatToggle.contains(e.target)) {
    chatbox.style.display = "none";
    chatToggle.setAttribute("aria-expanded", "false");
    chatbox.setAttribute("aria-hidden", "true");
  }
});

// Keyboard navigation for accessibility, Enter only (excluding chat elements)
document.querySelectorAll("button:not(#sendButton):not(.whatsapp-float), a:not(.nav-link), input:not(#chatInput), textarea:not(#chatInput)").forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (el.tagName === 'A' || el.tagName === 'BUTTON') {
        el.click();
      }
    }
  });
});

// Initialize scroll position
handleHeaderScroll();