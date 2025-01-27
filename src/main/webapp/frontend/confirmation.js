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
    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card bg-dark border-light mb-3';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const row = document.createElement('div');
    row.className = 'row';
    
    const imgCol = document.createElement('div');
    imgCol.className = 'col-md-3';
    
    const img = document.createElement('img');
    img.src = movieInfo.image;
    img.className = 'img-fluid rounded';
    img.alt = movieInfo.title;
    
    const contentCol = document.createElement('div');
    contentCol.className = 'col-md-9';
    
    const flexDiv = document.createElement('div');
    flexDiv.className = 'd-flex justify-content-between align-items-start';
    
    const infoDiv = document.createElement('div');
    
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = movieInfo.title;
    
    const details = document.createElement('p');
    details.className = 'card-text';
    details.textContent = `${movieInfo.genre} | ${movieInfo.duration}`;
    
    const ticketDetails = document.createElement('div');
    ticketDetails.className = 'ticket-details';
    
    const seatInfo = document.createElement('p');
    seatInfo.className = 'mb-1';
    const seatStrong = document.createElement('strong');
    seatStrong.textContent = 'Sitzplatz:';
    seatInfo.appendChild(seatStrong);
    seatInfo.appendChild(document.createTextNode(` Reihe ${seat.row}, Sitz ${seat.seat}`));
    
    const ticketInfo = document.createElement('p');
    ticketInfo.className = 'mb-1';
    const ticketStrong = document.createElement('strong');
    ticketStrong.textContent = 'Ticket-Nr:';
    ticketInfo.appendChild(ticketStrong);
    ticketInfo.appendChild(document.createTextNode(` ${ticketNumber}`));
    
    const priceInfo = document.createElement('p');
    priceInfo.className = 'mb-0';
    const priceStrong = document.createElement('strong');
    priceStrong.textContent = 'Preis:';
    priceInfo.appendChild(priceStrong);
    priceInfo.appendChild(document.createTextNode(' €12.00'));
    
    ticketDetails.appendChild(seatInfo);
    ticketDetails.appendChild(ticketInfo);
    ticketDetails.appendChild(priceInfo);
    
    infoDiv.appendChild(title);
    infoDiv.appendChild(details);
    infoDiv.appendChild(ticketDetails);
    
    flexDiv.appendChild(infoDiv);
    contentCol.appendChild(flexDiv);
    
    imgCol.appendChild(img);
    row.appendChild(imgCol);
    row.appendChild(contentCol);
    
    cardBody.appendChild(row);
    cardDiv.appendChild(cardBody);
    
    return cardDiv.outerHTML;
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
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'text-center';
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border text-light';
    spinner.setAttribute('role', 'status');
    const spinnerText = document.createElement('span');
    spinnerText.className = 'visually-hidden';
    spinnerText.textContent = 'Loading...';
    spinner.appendChild(spinnerText);
    loadingDiv.appendChild(spinner);
    virtualTicketsContainer.innerHTML = '';
    virtualTicketsContainer.appendChild(loadingDiv);

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
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = ticketHTML;
                virtualTicketsContainer.appendChild(tempDiv.firstChild);
            });

            // Clear localStorage only after successfully generating all tickets
            localStorage.removeItem('selectedMovie');
            localStorage.removeItem('bookingData');

            // Add navigation buttons
            const navDiv = document.createElement('div');
            navDiv.className = 'd-flex justify-content-center mt-4 mb-5';
            
            const homeLink = document.createElement('a');
            homeLink.href = '../index.xhtml';
            homeLink.className = 'btn btn-danger btn-lg';
            
            const icon = document.createElement('i');
            icon.className = 'bi bi-house-door-fill me-2';
            
            homeLink.appendChild(icon);
            homeLink.appendChild(document.createTextNode('Zurück zur Startseite'));
            navDiv.appendChild(homeLink);
            
            virtualTicketsContainer.appendChild(navDiv);
        } catch (error) {
            console.error('Error generating tickets:', error);
            virtualTicketsContainer.innerHTML = '';
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger';
            errorDiv.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
            virtualTicketsContainer.appendChild(errorDiv);
            
            setTimeout(() => {
                window.location.href = 'index.xhtml';
            }, 3000);
        }
    }, 1000);
});