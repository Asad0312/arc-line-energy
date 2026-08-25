// Booking Form Multi-Step Logic
let currentStep = 1;

function nextStep(step) {
    // Validate current step
    if (!validateStep(currentStep)) return;

    // Update step indicators
    document.querySelectorAll('.step').forEach(s => {
        const stepNum = parseInt(s.getAttribute('data-step'));
        if (stepNum < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (stepNum === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('active', 'completed');
        }
    });

    // Show next step
    document.querySelectorAll('.booking-form-step').forEach(formStep => {
        formStep.classList.remove('active');
    });
    document.querySelector(`.booking-form-step[data-step="${step}"]`).classList.add('active');

    currentStep = step;

    // Set minimum date to today
    if (step === 2) {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('preferredDate').setAttribute('min', today);
    }
}

function prevStep(step) {
    document.querySelectorAll('.step').forEach(s => {
        const stepNum = parseInt(s.getAttribute('data-step'));
        if (stepNum < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (stepNum === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('active', 'completed');
        }
    });

    document.querySelectorAll('.booking-form-step').forEach(formStep => {
        formStep.classList.remove('active');
    });
    document.querySelector(`.booking-form-step[data-step="${step}"]`).classList.add('active');

    currentStep = step;
}

function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        const category = document.getElementById('serviceCategory').value;
        const propertyType = document.getElementById('propertyType').value;

        if (!category) {
            shakeElement(document.getElementById('serviceCategory'));
            isValid = false;
        }
        if (!propertyType) {
            shakeElement(document.getElementById('propertyType'));
            isValid = false;
        }
    }

    if (step === 2) {
        const date = document.getElementById('preferredDate').value;
        const time = document.getElementById('preferredTime').value;
        const address = document.getElementById('serviceAddress').value;
        const city = document.getElementById('city').value;

        if (!date) {
            shakeElement(document.getElementById('preferredDate'));
            isValid = false;
        }
        if (!time) {
            shakeElement(document.getElementById('preferredTime'));
            isValid = false;
        }
        if (!address) {
            shakeElement(document.getElementById('serviceAddress'));
            isValid = false;
        }
        if (!city) {
            shakeElement(document.getElementById('city'));
            isValid = false;
        }
    }

    return isValid;
}

function shakeElement(el) {
    el.style.borderColor = '#ff5252';
    el.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        el.style.borderColor = '';
        el.style.animation = '';
    }, 1000);
}

function submitBooking() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    let isValid = true;

    if (!firstName) {
        shakeElement(document.getElementById('firstName'));
        isValid = false;
    }
    if (!lastName) {
        shakeElement(document.getElementById('lastName'));
        isValid = false;
    }
    if (!email || !isValidEmail(email)) {
        shakeElement(document.getElementById('email'));
        isValid = false;
    }
    if (!phone) {
        shakeElement(document.getElementById('phone'));
        isValid = false;
    }
    if (!agreeTerms) {
        shakeElement(document.getElementById('agreeTerms'));
        isValid = false;
    }

    if (isValid) {
        // Generate booking reference
        const ref = 'ALE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        document.getElementById('bookingRef').textContent = ref;

        // Show success message
        document.getElementById('bookingForm').style.display = 'none';
        document.getElementById('bookingSuccess').classList.add('show');

        // Scroll to top of form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Set minimum date on load
window.addEventListener('load', () => {
    setTimeout(() => {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('preferredDate');
        if (dateInput) dateInput.setAttribute('min', today);
    }, 1600);
});
