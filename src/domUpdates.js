import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';

// const logInPage = document.getElementById('logIn');
let bookingsLog, roomListings, customer;


// const usernameInput = document.getElementById('usernameInput');
// const logInForm = document.getElementById('logIn');
const dashboard = document.getElementById('dashboard');
const bookingsDisplay = document.getElementsByClassName('bookings-display');
const availableRooms = document.getElementById('availableRooms');
const bookingARoom = document.getElementById('bookingARoom');

let domUpdates = {
  //DISPLAY FUNCTIONS

  displayDashboard(customer, bookingsLog) {
    const amount = bookingsLog.calculateTotalSpent(roomListings, customer);
    bookingsDisplay.insertAdjacentHTML('afterbegin',
      `<h1>Hi ${customer.name}!</h1>
    <h3> My Bookings </h3>`);

    bookingsDisplay.insertAdjacentHTML('beforeend', 
    `<article>
      <li>Date: ${booking.date}</li>
      <li>Room Number: ${booking.roomNumber}</li>
      <li>Confirmation Number: ${booking.id}</li>
    </article>`)
      
    bookingsDisplay.insertAdjacentHTML('afterend',
      `<h2 class="amount-spent" id="amountSpent">You have spent ${amount} on rooms!</h2>`);

    this.hide([logInForm]);
    this.show([dashboard]);
  },

  displayAvailableRooms() {
    availableRooms.innerHTML = '';
    let roomsToDisplay = bookingsLog.getAvailableRooms(dateInput.value, roomListings);
    roomsToDisplay.forEach(room => {
      availableRooms.insertAdjacentHTML('beforeend', `<article class="available-room-card">
      <h3>${room.roomType}</h3>
      <h4>${room.numBeds} ${room.bedSize}</h4>`)
    })
    this.hide([logInForm, dashboard]);
    this.show([availableRooms]);
  },

  displayBookingARoom(event) {
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
    this.show([bookingARoom]);
  },


  //HELPER FUNCTIONS

  show(elements) {
      elements.forEach(element => element.classList.remove('hidden'));
    },

  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  }

};

export default domUpdates;