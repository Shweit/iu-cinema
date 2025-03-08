function showMovieDetails(cardElement) {
    const title = cardElement.querySelector('.card-title').textContent;
    const image = cardElement.querySelector('.card-img-top').src;
    const genre = cardElement.querySelector('.badge').textContent;
    const duration = cardElement.querySelector('.duration').textContent;
    const director = cardElement.dataset.director;
    const cast = cardElement.dataset.cast;
    const plot = cardElement.dataset.plot;
    const rating = cardElement.dataset.rating || '0';
    const trailer = cardElement.dataset.trailer || '#';

    const modalContent = `
        <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-4">
                    <img src="${image}" class="img-fluid rounded" alt="${title}">
                </div>
                <div class="col-md-8">
                    <h6>Regie</h6>
                    <p>${director}</p>
                    <h6>Besetzung</h6>
                    <p>${cast}</p>
                    <h6>Handlung</h6>
                    <p>${plot}</p>
                    <div class="movie-meta mb-4">
                        <span class="badge bg-info me-2">${genre}</span>
                        <span class="duration">${duration}</span>
                        <div class="rating mt-3">
                            <div class="stars" data-rating="${rating}">
                                ${generateStars(rating)}
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <button class="btn btn-secondary me-2" onclick="playTrailer('${trailer}')"><i class="bi bi-play-circle"></i> Trailer</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalElement = document.getElementById('movieDetailModal');
    modalElement.querySelector('.modal-content').innerHTML = modalContent;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function generateStars(rating) {
    const stars = [];
    const ratingNum = parseFloat(rating);
    for (let i = 1; i <= 5; i++) {
        if (i <= ratingNum) {
            stars.push('<i class="bi bi-star-fill text-warning"></i>');
        } else if (i - ratingNum < 1) {
            stars.push('<i class="bi bi-star-half text-warning"></i>');
        } else {
            stars.push('<i class="bi bi-star text-warning"></i>');
        }
    }
    return stars.join(' ');
}

function playTrailer(trailerUrl) {
    try {
        if (!trailerUrl || trailerUrl === '#') {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-warning';
            errorMessage.textContent = 'Trailer ist momentan nicht verfügbar.';
            
            const modalBody = document.querySelector('.modal-body');
            const existingAlert = modalBody.querySelector('.alert');
            if (existingAlert) {
                existingAlert.remove();
            }
            modalBody.insertBefore(errorMessage, modalBody.firstChild);
            
            setTimeout(() => errorMessage.remove(), 3000);
            return;
        }
        window.open(trailerUrl, '_blank');
    } catch (error) {
        console.error('Error playing trailer:', error);
    }
}

function bookTickets(element) {
    try {
        if (!element) {
            console.error('Invalid element for booking');
            return;
        }

        const movieId = element.dataset.movieId;
        const title = element.querySelector('.modal-title')?.textContent || 
                     element.querySelector('.card-title')?.textContent;
        const image = element.querySelector('.card-img-top')?.src;
        const genre = element.querySelector('.badge')?.textContent;
        const duration = element.querySelector('.duration')?.textContent;

        // Store movie details in localStorage
        const movieDetails = {
            movieId: movieId,
            title: title,
            image: image,
            genre: genre,
            duration: duration
        };
        
        try {
            localStorage.setItem('selectedMovie', JSON.stringify(movieDetails));
            window.location.href = `booking.xhtml?movieId=${movieId}`;
        } catch (storageError) {
            console.error('Failed to store movie details:', storageError);
            window.location.href = `booking.xhtml?movieId=${movieId}`;
        }
    } catch (error) {
        console.error('Error during booking:', error);
    }
}
    
// Close the modal if it's open
const modalElement = document.getElementById('movieDetailModal');
const modal = bootstrap.Modal.getInstance(modalElement);
if (modal) {
    modal.hide();
}