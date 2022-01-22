// creating a variable container and assigned query selectors
const container = document.querySelector('.container');
// creating a variable container and assigned query selectors
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// creating a variable const to get an element by its id
const count = document.getElementById('count');
// creating a variable const to get an element by its id
const total = document.getElementById('total');
// creating a variable const to get an element by its id
const movieSelect = document.getElementById('movie');

populateUI();

//creating a variable let to use in the  block scoped

let ticketPrice = +movieSelect.value;

// This function selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//  This function Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  // In this line we are setting the value of the specified local storage item
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  
    const selectedSeatsCount = selectedSeats.length;
    // In this line we are getting the inner text of the elements
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
  }

  // this function get data from localstorage and populate UI
function populateUI() {
  // creating a const variable that Returns the current value associated with the given key
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    // if  statement that will execute when the condition is true
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        }
  }

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  });

// Seat click event
// Adding a method addEventListener that will be called when receives the notification
container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');
  
      updateSelectedCount();
    }
  });
  
  // Initial count and total set
  updateSelectedCount();


