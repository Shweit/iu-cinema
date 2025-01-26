// No need to store movie data in JavaScript as it's now in HTML data attributes

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
                        <button class="btn btn-primary" onclick="bookTickets(this.closest('.modal-content'))">Tickets Buchen</button>
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
    if (trailerUrl === '#') {
        alert('Trailer ist momentan nicht verfügbar.');
        return;
    }
    window.open(trailerUrl, '_blank');
}

function bookTickets(element) {
    const title = element.querySelector('.modal-title')?.textContent || 
                 element.querySelector('.card-title')?.textContent;
    const image = element.querySelector('.card-img-top').src;
    const genre = element.querySelector('.badge').textContent;
    const duration = element.querySelector('.duration').textContent;
    const movieId = element.dataset.movieId;

    // Store movie details in localStorage
    const movieDetails = {
        movieId: movieId,
        title: title,
        image: image,
        genre: genre,
        duration: duration
    };
    localStorage.setItem('selectedMovie', JSON.stringify(movieDetails));

    window.location.href = 'booking.html';
}
    
// Close the modal if it's open
const modalElement = document.getElementById('movieDetailModal');
const modal = bootstrap.Modal.getInstance(modalElement);
if (modal) {
    modal.hide();
}