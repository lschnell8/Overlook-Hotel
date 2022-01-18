import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
// import domUpdates from './domUpdates.js';

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//QUERY SELECTORS

//BUTTONS
const logInBtn = document.getElementById('logInBtn');
const findAvailableRoomsBtn = document.getElementById('findAvailableRoomsBtn');
const backToDashBtn = document.getElementById('backToDashBtn');
// const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');

//INPUTS
const usernameInput = document.getElementById('usernameInput');
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
const loadData = () => {
  getData()
    .then(data => {
      // console.log(data[0].bookings, data[1].rooms, data[2])
      bookingsLog = new BookingsLog(data[0].bookings);
      roomListings = new RoomListings(data[1].rooms);
      // let customerListing = data[2];
      // customer = new Customer(customerListing.customers[0]);
      customer = new Customer(data[2]);
      console.log('THIS ONE', bookingsLog, roomListings, customer)
    })
};

const logIn = () => {
  // let customerId = getCustomerId();
  // console.log('OG', customerId)
  // getData()
  //   .then(data => {
  //     bookingsLog = new BookingsLog(data[0]);
  //     roomListings = new RoomListings(data[1]);
  //     customer = new Customer(data[2]);
  //   })
  //   // .then(data => instantiateClassInstances(data))
  console.log('THERE', bookingsLog)
  // domUpdates.displayDashboard(customer.name, amount);
};


//HELPER FUNCTIONS
const getData = () => {
  return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers', 1)])
};

const instantiateClassInstances = (data) => {
  console.log(data)
  bookingsLog = new BookingsLog(data[0]);
  roomListings = new RoomListings(data[1]);
  // let customerListing = data[2];
  // customer = new Customer(customerListing.customers[0]);
  // customer = new Customer(data[2])
  console.log('HERE', bookingsLog.bookings)
};

const getCustomerId = () => {
  let value = usernameInput.value;
  let id = value.split('r');
  console.log('THIS', value, id);
  return id
};




//EVENT LISTENERS
window.addEventListener('load', loadData);
logInBtn.addEventListener('click', logIn);
// findAvailableRoomsBtn.addEventListener('click', domUpdates.displayAvailableRooms());
// backToDashBtn.addEventListener('click', domUpdates.displayDashboard());