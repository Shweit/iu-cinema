// Get movie information from localStorage
function getMovieInfo() {
    const movieData = localStorage.getItem('selectedMovie');
    if (!movieData) {
        window.location.href = 'index.xhtml';
        return {};
    }
    return JSON.parse(movieData);
}

// Initialize movie information
function initializeMovieInfo() {
    const { title: movieTitle, image: movieImage, genre: movieGenre, duration: movieDuration } = getMovieInfo();
    
    document.getElementById('movieTitle').textContent = movieTitle || 'Film nicht gefunden';
    document.getElementById('movieImage').src = movieImage || '';
    document.getElementById('movieDetails').textContent = `${movieGenre || ''} ${movieDuration ? '| ' + movieDuration : ''}`;
}

// Initialize ticket quantity controls
function initializeTicketQuantity() {
    const decreaseBtn = document.getElementById('decreaseTickets');
    const increaseBtn = document.getElementById('increaseTickets');
    const quantitySpan = document.getElementById('ticketQuantity');
    let currentQuantity = 1;

    decreaseBtn.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantitySpan.textContent = currentQuantity;
            updateSeatSelection();
        }
    });

    increaseBtn.addEventListener('click', () => {
        if (currentQuantity < 5) {
            currentQuantity++;
            quantitySpan.textContent = currentQuantity;
            updateSeatSelection();
        }
    });
}

// Generate seats grid with row numbers
function generateSeats() {
    const container = document.getElementById('seatsContainer');
    const rows = 6;
    const seatsPerRow = 10;
    const occupiedSeats = generateRandomOccupiedSeats(rows * seatsPerRow * 0.3); // 30% seats are occupied

    // Generate seats
    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'seat-row';
        
        // Add row number
        const rowNumber = document.createElement('div');
        rowNumber.className = 'row-number';
        rowNumber.textContent = row + 1;
        rowDiv.appendChild(rowNumber);
        
        for (let seat = 0; seat < seatsPerRow; seat++) {
            const seatNumber = row * seatsPerRow + seat + 1;
            const seatElement = document.createElement('div');
            seatElement.className = `seat ${occupiedSeats.includes(seatNumber) ? 'occupied' : 'available'}`;
            seatElement.dataset.seatNumber = seatNumber;
            seatElement.title = `Reihe ${row + 1}, Sitz ${seat + 1}`;
            rowDiv.appendChild(seatElement);
        }
        
        container.appendChild(rowDiv);
    }
}

// Generate random occupied seats
function generateRandomOccupiedSeats(count) {
    const occupied = new Set();
    while (occupied.size < count) {
        occupied.add(Math.floor(Math.random() * 60) + 1);
    }
    return Array.from(occupied);
}

// Handle seat selection
function handleSeatSelection() {
    const container = document.getElementById('seatsContainer');
    const quantitySpan = document.getElementById('ticketQuantity');
    const selectedSeatsList = document.getElementById('selectedSeatsList');
    const totalPriceElement = document.getElementById('totalPrice');
    const bookButton = document.getElementById('bookButton');
    const pricePerTicket = 12; // €12 per ticket

    container.addEventListener('click', (e) => {
        if (!e.target.classList.contains('seat')) return;
        if (e.target.classList.contains('occupied')) {
            e.target.classList.add('shake');
            setTimeout(() => e.target.classList.remove('shake'), 500);
            return;
        }

        const maxSeats = parseInt(quantitySpan.textContent);
        const currentSelected = container.querySelectorAll('.seat.selected').length;

        if (!e.target.classList.contains('selected') && currentSelected >= maxSeats) {
            alert(`Sie können nur ${maxSeats} Sitzplätze auswählen.`);
            e.target.classList.add('shake');
            setTimeout(() => e.target.classList.remove('shake'), 500);
            return;
        }

        e.target.classList.toggle('selected');
        e.target.classList.add('pulse');
        setTimeout(() => e.target.classList.remove('pulse'), 500);
        updateSelectedSeats();
    });
}

function updateSeatSelection() {
    const container = document.getElementById('seatsContainer');
    const maxSeats = parseInt(document.getElementById('ticketQuantity').textContent);
    const selectedSeats = container.querySelectorAll('.seat.selected');

    if (selectedSeats.length > maxSeats) {
        Array.from(selectedSeats)
            .slice(maxSeats)
            .forEach(seat => seat.classList.remove('selected'));
    }
    // Always update the selected seats list and total price
    updateSelectedSeats();
}

// Make updateSelectedSeats globally accessible
function updateSelectedSeats() {
    const container = document.getElementById('seatsContainer');
    const selectedSeatsList = document.getElementById('selectedSeatsList');
    const totalPriceElement = document.getElementById('totalPrice');
    const bookButton = document.getElementById('bookButton');
    const pricePerTicket = 12; // €12 per ticket
    
    const selectedSeats = container.querySelectorAll('.seat.selected');
    selectedSeatsList.innerHTML = '';
    
    Array.from(selectedSeats).forEach(seat => {
        const seatNumber = seat.dataset.seatNumber;
        const row = Math.floor((seatNumber - 1) / 10) + 1;
        const seatInRow = ((seatNumber - 1) % 10) + 1;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Reihe ${row}, Sitz ${seatInRow}</span>
            <span>€${pricePerTicket.toFixed(2)}</span>
        `;
        li.classList.add('fade-in');
        selectedSeatsList.appendChild(li);
    });

    const totalPrice = selectedSeats.length * pricePerTicket;
    totalPriceElement.textContent = `€${totalPrice.toFixed(2)}`;
    bookButton.disabled = selectedSeats.length === 0;
    
    if (bookButton.disabled) {
        bookButton.classList.remove('btn-primary');
        bookButton.classList.add('btn-secondary');
    } else {
        bookButton.classList.remove('btn-secondary');
        bookButton.classList.add('btn-primary');
    }
}

// Save booking information and redirect to payment page
function handleBooking() {
    const movieInfo = getMovieInfo();
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => {
        const seatNumber = parseInt(seat.dataset.seatNumber);
        const row = Math.floor((seatNumber - 1) / 10) + 1;
        const seatInRow = ((seatNumber - 1) % 10) + 1;
        return { row, seat: seatInRow, seatNumber };
    });
    
    const bookingData = {
        movie: movieInfo,
        seats: selectedSeats,
        totalPrice: parseFloat(document.getElementById('totalPrice').textContent.replace('€', ''))
    };
    
    // Store booking data in localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    window.location.href = 'payment.html';
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeMovieInfo();
    initializeTicketQuantity();
    generateSeats();
    handleSeatSelection();
    
    // Add booking button click handler
    document.getElementById('bookButton').addEventListener('click', handleBooking);
});