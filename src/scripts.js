import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
import domUpdates from './domUpdates.js';
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
// const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');

//INPUTS
// const usernameInput = document.getElementById('usernameInput');
// const passwordInput = document.getElementById('passwordInput');
// const dateInput = document.getElementById('dateInput');
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
  if (passwordInput.value === '' || passwordInput.value !== 'overlook2021') {
    domUpdates.displayInputError(passwordInput);
  } else {
    let id = usernameInput.value.split('r')[1];
    getData(id)
      .then(data => {
        console.log(customer)
        domUpdates.displayDashboard(customer, bookingsLog, roomListings)
      }) 
  }
  // .then(data => instantiateClassInstances(data));
  // .then(console.log('Global bookingsLog 3', bookingsLog, 'Global customer 3', customer, 'Global roomListings 3', roomListings))
  // console.log('Global bookingsLog 3', bookingsLog)
  // console.log('Global customer 3', customer)
  // console.log('Global roomListings 3', roomListings)
  // domUpdates.displayDashboard(customer, bookingsLog.bookings);
};


//HELPER FUNCTIONS
const getData = (id) => {
  return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers', id)]).then(data => instantiateClassInstances(data));
};

const instantiateClassInstances = (data) => {
  console.log('DATA 1', data[0])
  bookingsLog = new BookingsLog(data[0].bookings);
  roomListings = new RoomListings(data[1].rooms);
  customer = new Customer(data[2]);
  console.log('BookingsLog Instantiation 2', bookingsLog)
  console.log('Customer Instantiation 2', customer)
  console.log('RoomListings Instantiation 2', roomListings)
};


//EVENT LISTENERS
// window.addEventListener('load', loadPage);
// usernameInput.addEventListener('blur', loadData);
logInForm.addEventListener('submit', logIn);
// findAvailableRoomsBtn.addEventListener('click', domUpdates.displayAvailableRooms());
// backToDashBtn.addEventListener('click', domUpdates.displayDashboard());