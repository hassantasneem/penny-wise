// Variable to store the current, correct CAPTCHA string
let currentCaptcha = ''; 

/**
 * Generates a random 6-character alphanumeric CAPTCHA string.
 * @returns {string} The generated CAPTCHA.
 */
function generateCaptcha() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

/**
 * Initializes the CAPTCHA on page load.
 */
function initCaptcha() {
    const captchaElement = document.getElementById('captchaText');
    if (captchaElement) {
        currentCaptcha = generateCaptcha();
        captchaElement.textContent = currentCaptcha;
    }
}

// Call initCaptcha when the script loads
initCaptcha();

// --- Navigation button handlers ---
function navigateWithTransition(url) {
    const container = document.getElementById('transition-container');
    container.style.pointerEvents = 'all';
    
    const panel = document.createElement('div');
    panel.className = 'slide-panel';
    panel.innerHTML = `
        <div class="slide-panel-logo">
            <img src="w_pennywise.png" alt="PennyWise">
        </div>
        <div class="loading-bar-container">
            <div class="loading-bar"></div>
        </div>
        <div class="loading-text">Loading...</div>
    `;
    container.appendChild(panel);
    
    setTimeout(() => {
        window.location.href = url;
    }, 2000);
}
/**
 * Handles the login attempt, including field validation and CAPTCHA check.
 */
function login() {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const captchaInput = document.getElementById('captchaInput')?.value.trim();
  const captchaElement = document.getElementById('captchaText');

  if (!name || !email || !captchaInput) {
    alert('Please fill in all fields (Name, Email, and CAPTCHA).');
    return;
  }

  // CAPTCHA check
  if (captchaInput !== currentCaptcha) {
      alert('Incorrect CAPTCHA. Please try again.');
    
    // Generate a new CAPTCHA and clear the input field
    if (captchaElement) {
        currentCaptcha = generateCaptcha();
        captchaElement.textContent = currentCaptcha;
    }
    
    const inputElement = document.getElementById('captchaInput');
    if (inputElement) {
        inputElement.value = '';
    }
    return;
  }

  // Successful login
  // Add your actual post-login logic (e.g., redirect to index.html) here
    navigateWithTransition('landing.html');
}



// Use a common function to safely add event listeners after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Navigates to landing.html (Home button)

    document.getElementById('home-button').addEventListener('click', function() {
    navigateWithTransition('index.html');
    });
     document.getElementById('fet-btn').addEventListener('click', function() {
    navigateWithTransition('index.html#features');
     });
     document.getElementById('rev-btn').addEventListener('click', function() {
    navigateWithTransition('index.html#reviews');
     });
    
     document.getElementById('faq-btn').addEventListener('click', function() {
    navigateWithTransition('index.html#faqs');
    });

    // Simple scroll/navigate to sections (or could be external pages)
    document.getElementById('about-button')?.addEventListener('click', () => {
      // In a single-page context, this would scroll to the #about section
         navigateWithTransition('about.html');
    });

    document.getElementById('contact-button')?.addEventListener('click', () => {
      // In a single-page context, this would scroll to the #contact section
          navigateWithTransition('contact.html');
    });

});