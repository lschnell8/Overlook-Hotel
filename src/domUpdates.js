import { currentDate } from './scripts.js'

//QUERY SELECTORS
const dashboard = document.getElementById('dashboard');
const bookingsDisplay = document.querySelector('.bookings-display');
const availableRooms = document.getElementById('availableRooms');
const roomCards = document.getElementById('roomCards');
// const loginError = document.getElementById('loginError');
const bookingARoom = document.getElementById('bookingARoom');
const roomSearchForm = document.getElementById('roomSearch');

const logInForm = document.getElementById('logInForm');
const roomTypeSelection = document.getElementById('roomTypeSelection');
// const filterByTypeBtn = document.getElementById('filterByType');
// const findAvailableRoomsBtn = document.getElementById('findAvailableRoomsBtn');
const backToDashBtn = document.getElementById('backToDashBtn');
// const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');



let domUpdates = {

  //DISPLAY FUNCTIONS
  displayError(errorType) { 
    this.show([errorType])
  },
  
  displayDashboard(customer, amount, customerBookings) {
    bookingsDisplay.insertAdjacentHTML('afterbegin',
    `<h1>Hi ${customer.name.split(' ')[0]}!</h1>
    <h3> My Bookings </h3>`);
    
    customerBookings.forEach(booking => {
      bookingsDisplay.insertAdjacentHTML('beforeend',
      `<article class="booking-post">
      <li>Date: ${booking.date}</li>
      <li>Room Number: ${booking.roomNumber}</li>
      <li>Confirmation Number: ${booking.id}</li>
      </article>`)
    });
    
    bookingsDisplay.insertAdjacentHTML('beforeend',
      `<h2 class="amount-spent" id="amountSpent">You have spent $${amount.toFixed(2)} on rooms!</h2>`);
  },

  displayDateSelection() {
    roomSearchForm.insertAdjacentHTML('afterbegin',
      `<h2>Book A Room</h3>
      <label>Check In Date:</label>
      <input type="date" min="${currentDate}"id="dateInput" required>`);
  },
  
  displayRooms(room) {
    roomCards.insertAdjacentHTML('beforeend', `<article class="available-room-card" id="${room.number}">
      <h3>${room.roomType}</h3>
      <h4>${room.numBeds} ${room.bedSize}</h4>`);
  },

  displayMessage(statement) {
    noMatches.innerText = statement;
  },
  
  displaySelectedRoom(room) {
    bookingARoom.insertAdjacentHTML('afterbegin',
      `<article class="selected-room" id="${room.number}">
      <h3>${room.roomType}</h3>
      <h4>Features</h4>
      <ul>
      <li>Bidet: ${room.bidet} </li>
      <li>${room.numBeds} ${room.bedSize}</li>
      </ul>
      <h5>Cost Per Night: ${room.costPerNight}</h5>
      </article>`)
  },

  //HELPER FUNCTIONS

  showDashboard() {
    this.hide([logInForm, backToDashBtn, availableRooms, bookingARoom]);
    this.show([dashboard]);
  },
  
  showAvailableRooms() {
    bookingsDisplay.innerHTML = '';
    this.hide([logInForm, dashboard]);
    this.show([availableRooms, roomTypeSelection, backToDashBtn]);
  },
  
  showFilteredRooms() {
    roomCards.innerHTML = '';
    typeInput.selectedIndex = 0;
    this.hide([roomTypeSelection])
    this.show([backToDashBtn])
  },

  showRoomToBook() {
    this.hide([logInForm, dashboard, availableRooms]);
    this.show([bookingARoom]);
  }, 
  
  show(elements) {
      elements.forEach(element => element.classList.remove('hidden'));
  },
  
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },
  
};

export default domUpdates;