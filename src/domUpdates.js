import { logInForm } from './scripts.js'
// const usernameInput = document.getElementById('usernameInput');
// const logInForm = document.getElementById('logIn');
const dashboard = document.getElementById('dashboard');
const bookingsDisplay = document.querySelector('.bookings-display');
const availableRooms = document.getElementById('availableRooms');
const bookingARoom = document.getElementById('bookingARoom');

let domUpdates = {
  
  //DISPLAY FUNCTIONS
  
  displayInputError(inputType) { 
    console.log(inputType.id)
    let type = inputType.id.toString();
    let message = type.split('i')[0]
    inputType.insertAdjacentHTML('beforebegin', `<p>*Please enter a valid ${message}*</p>`)
  },
  
  displayDashboard(customer, bookingsLog, roomListings, logInForm) {
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
    
    bookingsDisplay.insertAdjacentHTML('afterend',
    `<h2 class="amount-spent" id="amountSpent">You have spent $${amount.toFixed(2)} on rooms!</h2>`);
    
    this.hide([logInForm]);
    this.show([dashboard]);
  },
  
  displayAvailableRooms(roomListings, bookingsLog, logInForm) {
    console.log('BOOKINGS', bookingsLog, 'ROOMS', roomListings)
    availableRooms.innerHTML = '';
    let date = dateInput.value;
    let roomsToDisplay = bookingsLog.getAvailableRooms(date, roomListings);
    roomsToDisplay.forEach(room => {
      availableRooms.insertAdjacentHTML('beforeend', `<article class="available-room-card">
      <h3>${room.roomType}</h3>
      <h4>${room.numBeds} ${room.bedSize}</h4>`)
    })
    this.hide([logInForm, dashboard]);
    this.show([availableRooms]);
  },
  
  displayBookingARoom(event, logInForm, dashboard, bookingARoom, backToDashBtn) {
    roomListings.find(room => {
      if (event.target.closest(room.id)) {
        // [!room.bidet] = 'No'
        // [room.bidet] = 'Yes'
        if (!room.bidet) {
          room.bidet = 'No'
        } else {
          room.bidet = 'Yes'
        }
        bookingARoom.insertAdjacentHTML('afterbegin',
        `<article class="selected-room">
        <h3>${room.roomType}</h3>
        <h4>Features</h4>
        <ul>
        <li>Bidet: ${room.bidet} </li>
        <li>${room.numBeds} ${room.bedSize}</li>
        </ul>
        <h5>Cost Per Night: ${room.costPerNight}</h5>
        </article>`)
      }
    })
    this.hide([logInForm, dashboard]);
    this.show([bookingARoom, backToDashBtn]);
  },
  
  
  //HELPER FUNCTIONS
  
  show(elements) {
      elements.forEach(element => element.classList.remove('hidden'));
    },
  
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },
  
};

export default domUpdates;