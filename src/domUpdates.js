import { logInForm, currentDate, bookingsLog, roomListings } from './scripts.js'

//QUERY SELECTORS
const dashboard = document.getElementById('dashboard');
const bookingsDisplay = document.querySelector('.bookings-display');
const availableRooms = document.getElementById('availableRooms');
const roomCards = document.getElementById('roomCards');
const loginError = document.getElementById('loginError');
const bookingARoom = document.getElementById('bookingARoom');
const roomSearchForm = document.getElementById('roomSearch');
// const dateInput = document.getElementById('dateInput');

let domUpdates = {

  //DISPLAY FUNCTIONS
  displayLoginInputError() { 
    this.show([loginError])
  },

  displayFilterRoomsError() {
    
  },
  
  displayDashboard(customer, bookingsLog, roomListings) {
    let amount = bookingsLog.calculateTotalSpent(roomListings, customer);
    let customerBookings = bookingsLog.getCustomerBookings(customer);
    bookingsDisplay.insertAdjacentHTML('afterbegin',
    `<h1>Hi ${customer.name.split(' ')[0]}!</h1>
    <h3> My Bookings </h3>`);
    
    customerBookings.forEach(booking => {
      bookingsDisplay.insertAdjacentHTML('beforeend',
      `<article>
      <li>Date: ${booking.date}</li>
      <li>Room Number: ${booking.roomNumber}</li>
      <li>Confirmation Number: ${booking.id}</li>
      </article>`)
    });
    
    bookingsDisplay.insertAdjacentHTML('beforeend',
      `<h2 class="amount-spent" id="amountSpent">You have spent $${amount.toFixed(2)} on rooms!</h2>`);

    roomSearchForm.insertAdjacentHTML('afterbegin', 
      `<h2>Book A Room</h3>
      <label>Check In Date:</label>
      <input type="date" min="${currentDate}"id="dateInput" required>`)
  },
  
  displayAvailableRooms(roomListings, bookingsLog) {
    // roomCards.innerHTML = '';
    let dateInputValue = dateInput.value.split('-').join('/');
    let roomsToDisplay = bookingsLog.getAvailableRooms(dateInputValue, roomListings);
    let roomsToSelect = roomsToDisplay.map(room => {
      roomCards.insertAdjacentHTML('beforeend', `<article class="available-room-card" id="${room.number}">
      <h3>${room.roomType}</h3>
      <h4>${room.numBeds} ${room.bedSize}</h4>`)
    })
    return roomsToSelect
  },

  displayFilteredRooms(room) {
    // let dateInputValue = dateInput.value.split('-').join('/');
    // console.log('dU-64 dateInputValue', dateInputValue);
    // const roomsByType = bookingsLog.getAvailableRoomsByType(type, dateInputValue, roomListings);

    // roomsByType.forEach(room => {
    roomCards.insertAdjacentHTML('beforeend',
    `<article class="available-room-card" id="${room.number}">
      <h3>${room.roomType}</h3>
      <h4>${room.numBeds} ${room.bedSize}</h4>`)
      
    // })
  },
  
  displayBookingARoom(event, bookingARoom) {
    let customerRoomChoices = this.displayAvailableRooms(logInForm, roomListings, bookingsLog)
    customerRoomChoices.find(room => {
      if (event.target.id === room.number) {
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
      }
      return room
    })
    
  },

  //HELPER FUNCTIONS
  showDashboard() {
    this.hide([logInForm, backToDashBtn, availableRooms]);
    this.show([dashboard]);
  },
  
  showAvailableRooms() {
    roomSearchForm.innerHTML = '';
    bookingsDisplay.innerHTML = '';
    typeInput.selectedIndex = 0;
    this.hide([logInForm, dashboard, backToDashBtn]);
    this.show([availableRooms, roomTypeSelection]);
  },

  showFilteredRooms() {
    roomCards.innerHTML = '';
    this.hide([roomTypeSelection])
    this.show([backToDashBtn])
  },

  showRoomToBook() {
    this.hide([logInForm, dashboard]);
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