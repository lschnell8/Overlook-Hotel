import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
import domUpdates from './domUpdates.js';
// import { logInForm } from './domUpdates.js';
// import './domUpdates.js'
import './css/base.scss';

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

//QUERY SELECTORS

//BUTTONS AND SUBMITS
const logInForm = document.getElementById('logIn');
// const findAvailableRoomsBtn = document.getElementById('findAvailableRoomsBtn');
// const backToDashBtn = document.getElementById('backToDashBtn');
const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');

//INPUTS
// const usernameInput = document.getElementById('usernameInput');
// const passwordInput = document.getElementById('passwordInput');
// const dateInput = document.getElementById('dateInput').value;
const roomSearchForm = document.getElementById('roomSearch')
// const roomTypeSelection = document.getElementById('roomTypeSelection');

//PAGE VIEWS
// const logInPage = document.getElementById('logIn');
// const dashboard = document.getElementById('dashboard');
// const availableRooms = document.getElementById('availableRooms');
// const bookingARoom = document.getElementById('bookingARoom');

//TEXT //Don't need these can insertAdjacent HTML afterbegin dashboard
// const greeting = document.getElementById('greeting');
// const amountSpent = document.getElementById('amountSpent');


//roomTypeSelection.options[roomTypeSelection.selectedIndex].value; //This reads the value of the option in the select tag for roomType selection


//GLOBAL VARIABLES
let bookingsLog, roomListings, customer;


//EXECUTION FUNCTIONS

// const loadPage = () => {
//   console.log(document.activeElement)
//   console.log(usernameInput.value)
// };

// const loadData = () => {
  // usernameInput.onblur = () => {
  // customerInput
  // }
  
  // if (usernameInput.value === '') {
    // domUpdates.displayInputError(usernameInput)
  // // } else if (usernameInput.value.length < 9 || > 10) {
  // }
// };

const logIn = (event) => {
  event.preventDefault();
  if (usernameInput.value === '' || passwordInput.value === '' || passwordInput.value !== 'overlook2021') {
    domUpdates.displayInputError(passwordInput);
  } else {
    let id = usernameInput.value.split('r')[1];
    getData(id)
    .then(data => {
      domUpdates.displayDashboard(customer, bookingsLog, roomListings, logInForm)
    }) 
  }
};

const apendAvailableRooms = (event) => {
  event.preventDefault();
  domUpdates.displayAvailableRooms(roomListings, bookingsLog, logInForm);
};

const postBooking = () => {

};


//HELPER FUNCTIONS
const getData = (id) => {
  return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers', id)]).then(data => instantiateClassInstances(data));
};

const instantiateClassInstances = (data) => {
  bookingsLog = new BookingsLog(data[0].bookings);
  roomListings = new RoomListings(data[1].rooms);
  customer = new Customer(data[2]);
};


//EVENT LISTENERS
logInForm.addEventListener('submit', logIn);
// findAvailableRoomsBtn.addEventListener('click', apendAvailableRooms);
roomSearchForm.addEventListener('submit', apendAvailableRooms)
// backToDashBtn.addEventListener('click', domUpdates.displayDashboard(customer, bookingsLog, roomListings, logInForm));
bookMyRoomBtn.addEventListener('click', postBooking)

export default { logInForm }