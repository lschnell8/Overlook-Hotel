// import BookingsLog from './classes/BookingsLog';
// import RoomListings from './classes/RoomListings';
// import Customer from './classes/Customer';

const logInPage = document.getElementById('logIn');
const dashboard = document.getElementById('dashboard');
const availableRooms = document.getElementById('availableRooms');
const bookingARoom = document.getElementById('bookingARoom');

let domUpdates = {
  //DISPLAY FUNCTIONS

  displayDashboard() { //params name, amount
    // dashboard.insertAdjacentHTML('afterbegin', `<h1>Hi ${name}!</h1>
    // <h2 class="amount-spent" id="amountSpent">You have spent ${amount} on rooms!</h2>`);
    this.show([dashboard]);
    this.hide([logInPage]);
  },

  displayAvailableRooms() {
    this.show([availableRooms]);
    this.hide([logInPage, dashboard]);
  },

  displayBookingARoom() {
    this.show([bookingARoom]);
    this.hide([logInPage, dashboard]);
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