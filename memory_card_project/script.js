// Creating variable const and assign the element specified by its id
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
// this line creates an instance of the element for the specified tag.
  const card = document.createElement('div');
  card.classList.add('card');

// creating if statement to add active 
  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);
//update the cards when a new one is created 
  updateCurrentText();
}

// Show number of cards
//this function add the functionality to show how many cards we created
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
//This function will add the functionality to display the option of creating a new card 
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event listeners

// Next button
//This code gives the functionality to go to the next button and 
//show the next card created
//the EventListener will be invoked when the event is dispatched in this case click
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  // this line will increment by one when a new card is created 
  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  //This line will change the numbers of cards when the user moves the next button
  updateCurrentText();
});

// Prev button
//This code gives the functionality to go to the previous button and 
//show the next card created
//the EventListener will be invoked when the event is dispatched in this case click
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

// this line will decrease by one when a user go back to see the oldest cards
  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';


  //This line will change the numbers of cards when the user moves the previous button
  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  //This line will erase the number of cards display when the user erase them
  window.location.reload();
});