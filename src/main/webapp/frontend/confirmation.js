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

// Generate virtual ticket HTML
function generateVirtualTicket(movieInfo, seat) {
    const ticketNumber = generateTicketNumber(seat);
    
    return `
        <div class="card bg-dark border-light mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${movieInfo.image}" class="img-fluid rounded" alt="${movieInfo.title}">
                    </div>
                    <div class="col-md-9">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h3 class="card-title">${movieInfo.title}</h3>
                                <p class="card-text">${movieInfo.genre} | ${movieInfo.duration}</p>
                                <div class="ticket-details">
                                    <p class="mb-1"><strong>Sitzplatz:</strong> Reihe ${seat.row}, Sitz ${seat.seat}</p>
                                    <p class="mb-1"><strong>Ticket-Nr:</strong> ${ticketNumber}</p>
                                    <p class="mb-0"><strong>Preis:</strong> €12.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate a unique ticket number
function generateTicketNumber(seat) {
    const date = new Date();
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    return `TKT-${dateStr}-R${seat.row}S${seat.seat}`;
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const bookingInfo = getBookingInfo();
    const virtualTicketsContainer = document.getElementById('virtualTickets');

    // Add loading animation
    virtualTicketsContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div></div>';

    // Simulate loading delay for better UX
    setTimeout(() => {
        try {
            if (!bookingInfo || !bookingInfo.seats || !bookingInfo.movie) {
                throw new Error('Invalid booking data');
            }

            virtualTicketsContainer.innerHTML = '';
            // Generate a virtual ticket for each seat
            bookingInfo.seats.forEach(seat => {
                const ticketHTML = generateVirtualTicket(bookingInfo.movie, seat);
                virtualTicketsContainer.insertAdjacentHTML('beforeend', ticketHTML);
            });

            // Clear localStorage only after successfully generating all tickets
            localStorage.removeItem('selectedMovie');
            localStorage.removeItem('bookingData');

            // Add navigation buttons
            const navigationButtons = `
                <div class="d-flex justify-content-center mt-4 mb-5">
                    <a href="../index.xhtml" class="btn btn-danger btn-lg">
                        <i class="bi bi-house-door-fill me-2"></i>Zurück zur Startseite
                    </a>
                </div>
            `;
            virtualTicketsContainer.insertAdjacentHTML('beforeend', navigationButtons);
        } catch (error) {
            console.error('Error generating tickets:', error);
            virtualTicketsContainer.innerHTML = '<div class="alert alert-danger">Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.</div>';
            setTimeout(() => {
                window.location.href = 'index.xhtml';
            }, 3000);
        }
    }, 1000);
});