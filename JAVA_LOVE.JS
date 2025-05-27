document.addEventListener('DOMContentLoaded', () => {
    // Get references to various DOM elements
    const envelopeContainer = document.getElementById('envelopeContainer');
    const topFlap = document.getElementById('topFlap'); // Not directly used in the final logic but kept for completeness
    const clickText = document.getElementById('clickText');
    const valentinePopup = document.getElementById('valentinePopup');
    const loadingIndicator = document.querySelector('.loading-indicator');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const thankYouMessage = document.getElementById('thankYouMessage');

    // Hide loading indicator after a short delay (simulating loading)
    if (loadingIndicator) {
        setTimeout(() => {
            loadingIndicator.classList.add('hidden');
        }, 1000); // Hides after 1 second
    }

    // Event listener for clicking the envelope to open it
    if (envelopeContainer) {
        envelopeContainer.addEventListener('click', () => {
            // Ensure all necessary elements exist before proceeding
            if (!valentinePopup || !thankYouMessage || !clickText) return;

            // Prevent re-opening if the popup is already visible or the thank you message is shown
            if (!valentinePopup.classList.contains('hidden') || !thankYouMessage.classList.contains('hidden')) {
                return;
            }

            // Add 'opened' class to trigger envelope opening animation
            envelopeContainer.classList.add('opened');
            // Hide the "Please click" text
            clickText.classList.add('hidden');

            // After a delay, show the valentine popup
            // This delay allows the envelope animation to complete before the popup appears
            setTimeout(() => {
                valentinePopup.classList.remove('hidden');
            }, 1200);
        });
    }

    // Event listener for the "Yes" button
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            // Ensure all necessary elements exist before proceeding
            if (!valentinePopup || !thankYouMessage || !envelopeContainer) return;

            // Hide the valentine popup
            valentinePopup.classList.add('hidden');
            // Show the thank you message
            thankYouMessage.classList.remove('hidden');
            // Start the background floating hearts animation
            createFloatingHearts();

            // Hide the envelope container completely after "Yes" is clicked
            envelopeContainer.classList.add('hidden');
        });
    }

    // Event listener for the "No" button - This logic moves the button outside the popup
    if (noBtn) {
        noBtn.addEventListener('click', (event) => {
            // Ensure the valentine popup exists
            if (!valentinePopup) return;

            const button = event.target; // The "No" button itself
            const popupRect = valentinePopup.getBoundingClientRect(); // Dimensions and position of the popup
            const buttonRect = button.getBoundingClientRect(); // Dimensions and position of the button
            const viewportWidth = window.innerWidth; // Current viewport width
            const viewportHeight = window.innerHeight; // Current viewport height
            const offset = 20; // Minimum distance the button will move from the popup edge

            let targetX, targetY; // Variables to store the new target coordinates for the button

            // Randomly determine which side of the popup the button will move to
            // 0: top, 1: right, 2: bottom, 3: left
            const side = Math.floor(Math.random() * 4);

            switch (side) {
                case 0: // Move to the top of the popup
                    // Random X position within the popup's horizontal range
                    targetX = popupRect.left + Math.max(0, (popupRect.width - buttonRect.width)) * Math.random();
                    // Y position above the popup, considering button's height and offset
                    targetY = popupRect.top - buttonRect.height - offset;
                    break;
                case 1: // Move to the right of the popup
                    // X position to the right of the popup, considering offset
                    targetX = popupRect.right + offset;
                    // Random Y position within the popup's vertical range
                    targetY = popupRect.top + Math.max(0, (popupRect.height - buttonRect.height)) * Math.random();
                    break;
                case 2: // Move to the bottom of the popup
                    // Random X position within the popup's horizontal range
                    targetX = popupRect.left + Math.max(0, (popupRect.width - buttonRect.width)) * Math.random();
                    // Y position below the popup, considering offset
                    targetY = popupRect.bottom + offset;
                    break;
                case 3: // Move to the left of the popup (default case)
                default:
                    // X position to the left of the popup, considering button's width and offset
                    targetX = popupRect.left - buttonRect.width - offset;
                    // Random Y position within the popup's vertical range
                    targetY = popupRect.top + Math.max(0, (popupRect.height - buttonRect.height)) * Math.random();
                    break;
            }

            // Ensure the calculated target position keeps the button within the viewport boundaries
            targetX = Math.max(0, Math.min(targetX, viewportWidth - buttonRect.width));
            targetY = Math.max(0, Math.min(targetY, viewportHeight - buttonRect.height));

            // Apply 'fixed' position to move the button relative to the viewport,
            // effectively taking it out of its parent container's flow.
            button.style.position = 'fixed';
            // Set the new calculated left and top positions
            button.style.left = `${targetX}px`;
            button.style.top = `${targetY}px`;
            // Add a smooth transition for the movement
            button.style.transition = 'all 0.3s ease-out';
        });
    }

    // Function to create floating hearts in the background
    function createFloatingHearts() {
        // Ensure the body element exists before adding hearts
        if (!document.body) return;

        const numberOfHearts = 20; // Number of hearts to create
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('span');
            heart.classList.add('floating-heart'); // Add class for styling and animation
            heart.innerHTML = '❤️'; // Set heart emoji as content
            // Randomly position hearts horizontally across the viewport
            heart.style.left = `${Math.random() * 100}vw`;
            // Randomize animation delay for staggered appearance
            heart.style.animationDelay = `${Math.random() * 5}s`;
            // Randomize animation duration for varied speeds
            heart.style.animationDuration = `${5 + Math.random() * 5}s`;
            document.body.appendChild(heart); // Add heart to the body

            // Remove heart from DOM after its animation ends to prevent accumulation
            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }
});