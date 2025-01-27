// Get movie information from localStorage
function getMovieInfo() {
    const movieData = localStorage.getItem('selectedMovie');
    if (!movieData) {
        window.location.href = 'index.xhtml';
        return {};
    }
    return JSON.parse(movieData);
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

    const seatPlacement = document.getElementById('hall:seatPlacement').value;
    const dict = JSON.parse(seatPlacement);
    const rows = dict['rows']
    const seatsPerRow = dict['columns']

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
            seatElement.className = 'seat available';
            seatElement.dataset.seatNumber = seatNumber;
            seatElement.title = `Reihe ${row + 1}, Sitz ${seat + 1}`;
            rowDiv.appendChild(seatElement);
        }
        
        container.appendChild(rowDiv);
    }
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
    while (selectedSeatsList.firstChild) {
        selectedSeatsList.removeChild(selectedSeatsList.firstChild);
    }
    
    Array.from(selectedSeats).forEach(seat => {
        const seatNumber = seat.dataset.seatNumber;
        const row = Math.floor((seatNumber - 1) / 10) + 1;
        const seatInRow = ((seatNumber - 1) % 10) + 1;
        
        const li = document.createElement('li');
        li.classList.add('fade-in');
        
        const seatSpan = document.createElement('span');
        seatSpan.textContent = `Reihe ${row}, Sitz ${seatInRow}`;
        
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `€${pricePerTicket.toFixed(2)}`;
        
        li.appendChild(seatSpan);
        li.appendChild(priceSpan);
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

function fillAlreadyBookedSeats() {
    const bookedSeatsSelect = document.getElementById('showtime');

    bookedSeatsSelect.addEventListener('change', () => {
        // 1. Deselect all booked seats
        const elems = document.getElementsByClassName('seat occupied');
        [...elems].forEach(elem => {
            elem.classList.remove('occupied');
            elem.classList.add('available')
        });

        // 2. Set all bookedSeats as occupied
        // Retrieve the selected option and pull the data-booked-seats attribute
        const selectedOption = bookedSeatsSelect.options[bookedSeatsSelect.selectedIndex]
        const bookedSeatsString = selectedOption.getAttribute('data-booked-seats');
        const bookedSeats = bookedSeatsString.substring(1, bookedSeatsString.length-1).split(", ");

        if (bookedSeats.length !== 0) {
            bookedSeats.forEach(seat => {
                const [row, seatNumber] = seat.split(":");
                const formattedSeatNumber = parseInt(row) * 10 + parseInt(seatNumber) // Example: 03:05 => 35

                const seatElem = document.querySelector(`[data-seat-number="${formattedSeatNumber}"]`)

                if (seatElem) {
                    seatElem.classList.remove('available')
                    seatElem.classList.add('occupied')
                }
            })
        }
    })

    // Manually Trigger Event
    const initialEvent = new Event("change")
    bookedSeatsSelect.dispatchEvent(initialEvent);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTicketQuantity();
    generateSeats();
    fillAlreadyBookedSeats();
    handleSeatSelection();
    
    // Add booking button click handler
    document.getElementById('bookButton').addEventListener('click', handleBooking);
});

// Update handleBooking function to include showtime
function handleBooking() {
    const movieInfo = getMovieInfo();
    const showtime = document.getElementById('showtime').value;
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => {
        const seatNumber = parseInt(seat.dataset.seatNumber);
        const row = Math.floor((seatNumber - 1) / 10) + 1;
        const seatInRow = ((seatNumber - 1) % 10) + 1;
        return { row, seat: seatInRow, seatNumber };
    });
    
    const bookingData = {
        movie: movieInfo,
        showtime: showtime,
        seats: selectedSeats,
        totalPrice: parseFloat(document.getElementById('totalPrice').textContent.replace('€', ''))
    };
    
    // Store booking data in localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    window.location.href = 'payment.html';
}