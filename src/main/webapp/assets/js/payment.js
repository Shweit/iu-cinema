// Get booking information from localStorage
function getBookingInfo() {
    const bookingData = localStorage.getItem('bookingData');
    if (!bookingData) {
        window.location.href = 'index.xhtml';
        return null;
    }
    const parsedData = JSON.parse(bookingData);
    if (!parsedData || !parsedData.seats || !parsedData.totalPrice) {
        window.location.href = 'index.xhtml';
        return null;
    }
    return parsedData;
}

// Initialize booking information display
function initializeBookingInfo() {
    const bookingInfo = getBookingInfo();

    // Update selected seats
    const seatsList = document.getElementById('selectedSeatsList');
    seatsList.innerHTML = bookingInfo.seats.map(seat =>
        `<li>Reihe ${seat.row}, Sitz ${seat.seat}</li>`
    ).join('');

    // Update total price
    document.getElementById('totalPrice').textContent = `${bookingInfo.totalPrice.toFixed(2)} €`;
}

// Generate unique ticket ID
function generateTicketId(movieId, seat) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${movieId}-${seat.row}${seat.seat}-${timestamp}-${random}`;
}

// Initialize ticket holder fields
function initializeTicketHolders() {
    const bookingInfo = getBookingInfo();
    if (!bookingInfo || !bookingInfo.seats) return;
    const ticketHolderSection = document.getElementById('ticketHolderSection');
    if (!ticketHolderSection) return;

    const seats = bookingInfo.seats;
    const pricePerTicket = parseFloat(document.getElementById('price-per-ticket').textContent.replace('€', ''));

    function createTicketHolder(index) {
        const ticketId = `ticket-${index}`;

        const movieId = new URLSearchParams(window.location.search).get('movieId');
        const uniqueTicketId = generateTicketId(movieId, seats[index - 1]);
        const ticketHolder = document.createElement('div');
        ticketHolder.className = 'accordion-item bg-dark text-light border-secondary mb-3';
        ticketHolder.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button bg-dark text-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#${ticketId}" style="box-shadow: none;">
                    <span class="fw-bold">Ticket #${index}</span> - <span class="ticket-status ms-2 opacity-75">Unvollständig</span>
                </button>
            </h2>
            <div id="${ticketId}" class="accordion-collapse collapse show">
                <div class="accordion-body bg-dark">
                    <div class="row g-4">
                        <div class="col-6">
                            <label class="form-label text-light opacity-75">Vorname</label>
                            <input type="text" class="form-control bg-dark text-light border-secondary ticket-firstname" required>
                        </div>
                        <div class="col-6">
                            <label class="form-label text-light opacity-75">Nachname</label>
                            <input type="text" class="form-control bg-dark text-light border-secondary ticket-lastname" required>
                        </div>
                        <input type="hidden" class="ticket-id" value="${uniqueTicketId}">
                    </div>
                </div>
            </div>
        `;

        // Add input event listeners
        const firstNameInput = ticketHolder.querySelector('.ticket-firstname');
        const lastNameInput = ticketHolder.querySelector('.ticket-lastname');
        const statusSpan = ticketHolder.querySelector('.ticket-status');
        const accordionCollapse = ticketHolder.querySelector('.accordion-collapse');

        function checkCompletion() {
            const isComplete = firstNameInput.value.trim() !== '' && lastNameInput.value.trim() !== '';
            statusSpan.textContent = isComplete ? 'Vollständig' : 'Unvollständig';
            statusSpan.className = `ticket-status ms-2 ${isComplete ? 'text-success opacity-75' : 'opacity-75'}`;
        }

        // Keep input event for real-time status updates
        firstNameInput.addEventListener('input', checkCompletion);
        lastNameInput.addEventListener('input', checkCompletion);

        return ticketHolder;
    }

    // Create ticket holders based on selected seats
    seats.forEach((_, index) => {
        ticketHolderSection.appendChild(createTicketHolder(index + 1));
    });

    // Update total price
    const totalPrice = document.getElementById('totalPrice');
    if (totalPrice) {
        totalPrice.textContent = `${(seats.length * pricePerTicket).toFixed(2)} €`;
    }

    // Initialize Bootstrap accordions
    const accordionElements = document.querySelectorAll('.accordion-collapse');
    accordionElements.forEach(element => {
        new bootstrap.Collapse(element, {
            toggle: false
        });
    });
}

function generateTicketNumber(seat) {
    const date = new Date();
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const movieId = new URLSearchParams(window.location.search).get('movieId');
    return `TKT-${dateStr}-R${seat.row}S${seat.seat}-${movieId}`;
}

// Collect ticket holder information
function collectTicketHolderInfo() {
    const bookingInfo = getBookingInfo();
    if (!bookingInfo || !bookingInfo.seats) return null;

    const ticketHolders = [];
    const ticketElements = document.querySelectorAll('.accordion-item');

    for (let i = 0; i < ticketElements.length; i++) {
        const element = ticketElements[i];
        const firstName = element.querySelector('.ticket-firstname').value.trim();
        const lastName = element.querySelector('.ticket-lastname').value.trim();
        const ticketNumber = generateTicketNumber(bookingInfo.seats[i]);
        const price = parseFloat(document.getElementById('price-per-ticket').textContent.replace('€', ''));
        const showtime = bookingInfo.showtime;

        if (!firstName || !lastName) return null;

        ticketHolders.push({
            seat: bookingInfo.seats[i],
            showtime,
            price,
            firstName,
            lastName,
            ticketNumber
        });
    }
    return ticketHolders;
}

// Update validateForm function
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
            if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                isValid = false;
            }
        }
    });

    const ticketHolders = collectTicketHolderInfo();
    if (!ticketHolders) {
        isValid = false;
    }

    return isValid;
}

// Show error message
function showError(input, message) {
    if (!input || !input.closest) return;

    let formGroup = input.closest('.form-group');
    if (!formGroup) {
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
    input.value = value.replace(/(.{4})/g, '$1 ').trim();
}

// Handle payment method selection
function handlePaymentMethodChange(event) {
    const paymentMethod = event.target.value;
    const sepaFields = document.getElementById('sepaFields');
    const creditCardFields = document.getElementById('creditCardFields');

    const sepaInputs = sepaFields.querySelectorAll('input');
    const creditCardInputs = creditCardFields.querySelectorAll('input');

    if (paymentMethod === 'sepa') {
        sepaFields.style.display = 'block';
        creditCardFields.style.display = 'none';

        sepaInputs.forEach(input => input.required = true);
        creditCardInputs.forEach(input => input.required = false);
    } else if (paymentMethod === 'creditCard') {
        creditCardFields.style.display = 'block';
        sepaFields.style.display = 'none';

        creditCardInputs.forEach(input => input.required = true);
        sepaInputs.forEach(input => input.required = false);
    } else {
        sepaFields.style.display = 'none';
        creditCardFields.style.display = 'none';

        sepaInputs.forEach(input => input.required = false);
        creditCardInputs.forEach(input => input.required = false);
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBookingInfo();
    initializeTicketHolders();

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

            // Process payment and save booking data
            const bookingInfo = getBookingInfo();
            if (bookingInfo && Object.keys(bookingInfo).length > 0) {
                const ticketHolders = collectTicketHolderInfo();
                const movieId = new URLSearchParams(window.location.search).get('movieId');
                
                // Collect billing information
                const billingInfo = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    street: document.getElementById('street').value,
                    houseNumber: document.getElementById('houseNumber').value,
                    zipCode: document.getElementById('zipCode').value,
                    city: document.getElementById('city').value,
                    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
                };

                // Prepare data for server
                const paymentData = {
                    movieId: parseInt(movieId),
                    total: parseFloat(bookingInfo.totalPrice),
                    ticketHolders: JSON.stringify(ticketHolders),
                    billingInfo: JSON.stringify(billingInfo)
                };

                document.getElementById('paymentForm:movieId').value = paymentData.movieId;
                document.getElementById('paymentForm:total').value = paymentData.total;
                document.getElementById('paymentForm:ticketHolders').value = paymentData.ticketHolders;
                document.getElementById('paymentForm:billingInfo').value = paymentData.billingInfo;   
                
                // Submit the form
                document.getElementById('paymentForm:submitButton').click();
            } else {
                alert('Buchungsdaten nicht gefunden. Bitte beginnen Sie den Buchungsprozess erneut.');
                window.location.href = 'index.xhtml';
            }
        }
    });

    // Handle payment method changes
    const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethodInputs.forEach(input => {
        input.addEventListener('change', handlePaymentMethodChange);
    });
});
