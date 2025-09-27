// ===== CONFIGURATION =====
const SCROLL_THRESHOLD = 50;
const FORM_SUBMIT_DELAY = 1500;

// ===== INITIALIZATION =====
// Initialize AOS animations for smooth transitions
AOS.init({
  duration: 800,
  once: true,
});

// Initialize scroll position
handleHeaderScroll();

// ===== SCROLL HANDLERS =====
// Header scroll effect
function handleHeaderScroll() {
  const header = document.querySelector('.header');
  if (window.scrollY > SCROLL_THRESHOLD) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll);

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

// Close mobile menu helper function
function closeMobileMenu() {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const hamburger = document.querySelector(".hamburger");
  if (navbarCollapse && hamburger && navbarCollapse.classList.contains('show')) {
    navbarCollapse.classList.remove('show');
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = `<i class="fas fa-bars"></i>`;
  }
}

// ===== NAVIGATION =====
// Navigation links with click handling
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("href").substring(1);
      scrollToSection(sectionId);
      setActiveLink(sectionId);
      closeMobileMenu(); // Close mobile menu if open
    });
  });

  // Initialize Splide carousels
  if (typeof Splide !== 'undefined') {
    // Benefits Carousel
    const benefitsEl = document.querySelector('.benefits-carousel');
    if (benefitsEl) {
      new Splide(benefitsEl, {
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
          991: { perPage: 2, gap: '0.75rem' },
          768: { perPage: 1, gap: '0.5rem' }
        }
      }).mount();
    }

    // Testimonials Carousel
    const testimonialsEl = document.querySelector('.testimonials-carousel');
    if (testimonialsEl) {
      new Splide(testimonialsEl, {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        arrows: true,
        pagination: true,
        padding: { left: '2rem', right: '2rem' }
      }).mount();
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = savedTheme;
  const themeIcon = document.querySelector(".theme-toggle i");
  if (themeIcon) {
    themeIcon.className = `fas ${savedTheme === "dark" ? "fa-sun" : "fa-moon"}`;
  }
});

// Hamburger menu toggle for mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      const navbarCollapse = document.querySelector('.navbar-collapse');
      const isOpen = navbarCollapse.classList.contains('show');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        navbarCollapse.classList.add('show');
        hamburger.setAttribute("aria-expanded", "true");
        hamburger.innerHTML = `<i class="fas fa-times"></i>`;
      }
    });
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const hamburger = document.querySelector(".hamburger");
  
  if (navbarCollapse && hamburger && 
      navbarCollapse.classList.contains('show') && 
      !navbarCollapse.contains(e.target) && 
      !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});

// ===== THEME TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.body.dataset.theme;
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.body.dataset.theme = newTheme;
      
      const icon = document.querySelector(".theme-toggle i");
      if (icon) {
        icon.className = `fas ${newTheme === "dark" ? "fa-sun" : "fa-moon"}`;
      }
      
      localStorage.setItem('theme', newTheme);
    });
  }
});

// ===== CONTACT FORM =====
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Clear previous errors
      document.querySelectorAll(".invalid-feedback").forEach((error) => {
        error.textContent = "";
      });

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
        loader.classList.remove("d-none");

        // Simulate form submission
        setTimeout(() => {
          alert("Thank you for contacting us! We'll get back to you soon.");
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
          loader.classList.add("d-none");
        }, FORM_SUBMIT_DELAY);
      }
    });
  }
});

// ===== SECTION OBSERVER =====
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll("section[id]");
  let currentActiveSection = 'home';

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -40% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        if (sectionId !== currentActiveSection) {
          currentActiveSection = sectionId;
          setActiveLink(sectionId);
          
          if (history.pushState) {
            history.pushState(null, null, `#${sectionId}`);
          }
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});

// ===== BROWSER NAVIGATION =====
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

// ===== CHAT-API-URL CONFIGURATION =====
const CHAT_FOCUS_DELAY = 300;
const CHAT_API_URL = 'http://127.0.0.1:5000/predict';

// ===== CHAT WIDGET =====
document.addEventListener('DOMContentLoaded', function() {
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
      setTimeout(() => {
        if (chatInput) chatInput.focus();
      }, CHAT_FOCUS_DELAY);
    }
  }

  // Append message to chat
  function appendMessage(sender, message, isTyping = false) {
    if (!chatBody) return null;
    
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender);
    
    if (isTyping) {
      messageElement.classList.add("typing");
    }
    
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    return messageElement;
  }

  // Send message to backend and get response
  async function sendMessage() {
    if (!chatInput || !sendButton || !chatBody) return;

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

      // Try API call with fallback
      let data;
      try {
        const response = await fetch(CHAT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
        data = await response.json();
      } catch (error) {
        // Mock delay and response
        await new Promise(resolve => setTimeout(resolve, 1000));
        data = { response: "Thanks for your message! This is a simulated response from Ubizo iMarket support. How else can I assist you?" };
      }
      
      // Remove typing indicator
      chatBody.removeChild(typingIndicator);

      // Display bot response
      appendMessage("bot", data.response || "Thanks for your message! Our team will reply shortly.");
      
    } catch (error) {
      console.error("Chat Error:", error);
      
      // Remove typing indicator on error
      const typingEl = document.querySelector('.chat-message.typing');
      if (typingEl && chatBody.contains(typingEl)) {
        chatBody.removeChild(typingEl);
      }
      
      appendMessage("bot", "Sorry, I'm having trouble connecting right now. Please try again later.");
    } finally {
      chatInput.disabled = false;
      sendButton.disabled = false;
      sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
      chatInput.focus();
    }
  }

  // Event listeners for chat
  if (chatToggle) {
    chatToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleChat();
    });
  }

  if (sendButton) {
    sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      sendMessage();
    });
  }

  if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Close chat when clicking outside
  document.addEventListener('click', (e) => {
    if (chatbox && chatToggle &&
        chatbox.style.display === "flex" && 
        !chatbox.contains(e.target) && 
        !chatToggle.contains(e.target)) {
      chatbox.style.display = "none";
      chatToggle.setAttribute("aria-expanded", "false");
      chatbox.setAttribute("aria-hidden", "true");
    }
  });
});

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('DOMContentLoaded', function() {
  // Exclude chat and navigation elements from Enter key handling
  const excludedSelectors = [
    '#sendButton',
    '.whatsapp-float', 
    '.btn-close',
    '.nav-link',
    '#chatInput'
  ].join(', ');

  document.querySelectorAll(`button:not(${excludedSelectors}), a:not(${excludedSelectors}), input:not(${excludedSelectors}), textarea`).forEach((el) => {
    
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (el.tagName === 'A' || el.tagName === 'BUTTON') {
          el.click();
        }
      }
    });

  });

});