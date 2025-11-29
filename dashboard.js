document.addEventListener('DOMContentLoaded', function () {
    // 1. Get all FAQ question elements
    const faqQuestions = document.querySelectorAll('.faq-question');

    // 2. Loop through each question to add a click listener
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Find the parent item (the whole box)
            const faqItem = question.closest('.faq-item');

            // Find the answer element
            const answer = faqItem.querySelector('.faq-answer');

            // Find the chevron icon
            const icon = faqItem.querySelector('.fas.fa-chevron-down');

            // 3. Toggle the 'active' class on the whole item
            faqItem.classList.toggle('active');

            // 4. Handle the opening/closing effect
            if (faqItem.classList.contains('active')) {
                // If opening, set the max-height to the actual height of the content
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.style.transform = "rotate(180deg)";
            } else {
                // If closing, set max-height to 0
                answer.style.maxHeight = "0";
                icon.style.transform = "rotate(0deg)";
            }
        });
    });
});
function navigateWithTransition(url) {
    const container = document.getElementById('transition-container');
    container.style.pointerEvents = 'all';

    const panel = document.createElement('div');
    panel.className = 'slide-panel';
    panel.innerHTML = `
        <div class="slide-panel-logo">
            <img src="pennytransition1.png" alt="PennyWise">
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

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('contact-button').addEventListener('click', function () {
        navigateWithTransition('contact.html');
    });
    document.getElementById('about-button').addEventListener('click', function () {
        navigateWithTransition('about.html');
    });
    document.getElementById('home-button').addEventListener('click', function () {
        navigateWithTransition('dashboard.html');
    });
    document.getElementById('start-btn').addEventListener('click', function () {
        navigateWithTransition('login.html');
    });
    document.getElementById('start-btn2').addEventListener('click', function () {
        navigateWithTransition('login.html');
    });
    document.getElementById('start-btn3').addEventListener('click', function () {
        navigateWithTransition('login.html');
    });
    document.getElementById('ft-btn').addEventListener('click', function () {
        navigateWithTransition('dashboard.html#features');
    });
    document.getElementById('rev-btn').addEventListener('click', function () {
        navigateWithTransition('dashboard.html#reviews');
    });
    document.getElementById('faq-btn').addEventListener('click', function () {
        navigateWithTransition('dashboard.html#faqs');
    });
});

