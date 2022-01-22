
// In this lines I am creating const variables and assigned a 
//getElementById() method that return the element by its specific id 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// in this line the JSON.parse() to convert text into a JavaScript object
const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
    );

    let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();
// this condition checks the user input for value ant amount
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
// this statement will will calculate the amount
  }else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
  }
  
  // Add transactions to DOM list
  function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
  
    const item = document.createElement('li');
  
    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  
    item.innerHTML = `
    //Math provides mathematics functionalities
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;

    //In this line we are moving item from its current position to the new position
    list.appendChild(item);
  }

  // Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
  
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  
    const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);
  
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
  }

  // Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    updateLocalStorage();
  
    init();
  }
  
  // Update local storage transactions
  function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  // Init app
  function init() {
    list.innerHTML = '';
    
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  init();
  
  form.addEventListener('submit', addTransaction);