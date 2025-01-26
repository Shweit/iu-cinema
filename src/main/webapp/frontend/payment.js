// Get booking information from localStorage
function getBookingInfo() {
    const bookingData = localStorage.getItem('bookingData');
    if (!bookingData) {
        window.location.href = 'index.xhtml';
        return null;
    }
    const parsedData = JSON.parse(bookingData);
    if (!parsedData || !parsedData.movie || !parsedData.seats || !parsedData.totalPrice) {
        window.location.href = 'index.xhtml';
        return null;
    }
    return parsedData;
}

// Initialize booking information display
function initializeBookingInfo() {
    const bookingInfo = getBookingInfo();
    
    if (!bookingInfo || !bookingInfo.movie || !bookingInfo.seats || !bookingInfo.totalPrice) {
        window.location.href = 'index.xhtml';
        return;
    }
    
    // Update movie information
    document.getElementById('movieTitle').textContent = bookingInfo.movie.title || '';
    document.getElementById('movieImage').src = bookingInfo.movie.image || '';
    document.getElementById('movieDetails').textContent = 
        `${bookingInfo.movie.genre || ''} ${bookingInfo.movie.duration ? '| ' + bookingInfo.movie.duration : ''}`;
    
    // Update selected seats
    const seatsList = document.getElementById('selectedSeatsList');
    seatsList.innerHTML = bookingInfo.seats.map(seat => 
        `<li>Reihe ${seat.row}, Sitz ${seat.seat}</li>`
    ).join('');
    
    // Update total price
    document.getElementById('totalPrice').textContent = `€${bookingInfo.totalPrice.toFixed(2)}`;
}

// Validate form fields
function validateForm() {
    const form = document.getElementById('billingForm');
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input || !input.value || !input.value.trim()) {
            showError(input, 'Dieses Feld ist erforderlich');
            isValid = false;
        } else {
            clearError(input);
            // Additional validation based on input type
            if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                isValid = false;
            } else if (input.id === 'cardNumber' && !isValidCardNumber(input.value)) {
                showError(input, 'Bitte geben Sie eine gültige Kartennummer ein');
                isValid = false;
            } else if (input.id === 'cvv' && !isValidCVV(input.value)) {
                showError(input, 'Bitte geben Sie einen gültigen CVV-Code ein');
                isValid = false;
            }
        }
    });

    return isValid;
}

// Show error message
function showError(input, message) {
    if (!input || !input.closest) return;
    
    const formGroup = input.closest('.form-group');
    if (!formGroup) {
        // If no form-group is found, create one and wrap the input
        const newFormGroup = document.createElement('div');
        newFormGroup.className = 'form-group';
        input.parentNode.insertBefore(newFormGroup, input);
        newFormGroup.appendChild(input);
        formGroup = newFormGroup;
    }
    
    let errorDiv = formGroup.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    input.classList.add('is-invalid');
}

// Clear error message
function clearError(input) {
    if (!input || !input.closest) return;
    
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

// Validation helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCardNumber(number) {
    return /^\d{16}$/.test(number.replace(/\s/g, ''));
}

function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Format card number with spaces
function formatCardNumber(input) {
    const value = input.value.replace(/\s/g, '');
    const formatted = value.replace(/(.{4})/g, '$1 ').trim();
    input.value = formatted;
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBookingInfo();
    
    // Add input event listeners for real-time validation
    const form = document.getElementById('billingForm');
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.id === 'cardNumber') {
                formatCardNumber(input);
            }
            if (input.value.trim()) {
                clearError(input);
            }
        });

        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                showError(input, 'Dieses Feld ist erforderlich');
            }
        });
    });

    // Add payment form submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verarbeitung...';

            // Simulate payment processing
            setTimeout(() => {
                const bookingInfo = getBookingInfo();
                if (bookingInfo && Object.keys(bookingInfo).length > 0) {
                    // Store the booking info again to ensure it's available in confirmation page
                    try {
                        localStorage.setItem('bookingData', JSON.stringify(bookingInfo));
                        window.location.href = 'confirmation.html';
                    } catch (error) {
                        console.error('Error storing booking data:', error);
                        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }
                } else {
                    alert('Buchungsdaten nicht gefunden. Bitte beginnen Sie den Buchungsprozess erneut.');
                    window.location.href = 'index.xhtml';
                }
            }, 1500);
        }
    });
});