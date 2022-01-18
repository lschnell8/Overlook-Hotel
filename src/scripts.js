import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
import './domUpdates.js';

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//QUERY SELECTORS

//BUTTONS
const logInBtn = document.getElementById('logInBtn');
// const findAvailableRoomsBtn = document.getElementById('findAvailableRoomsBtn');
// const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');

//INPUTS
const userNameInput = document.getElementById('userNameInput').value;
// const passwordInput = document.getElementById('passwordInput');
// const dateInput = document.getElementById('dateInput');
// const roomTypeSelection = document.getElementById('roomTypeSelection');

//PAGE VIEWS
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
  
};

const logIn = () => {
  let splitInput = userNameInput.split('r');
  let id = Number(splitInput[1]);
 getData(id)
   .then(data => instantiateClassInstances(data))
};


//HELPER FUNCTIONS
const getData = (id) => {
  return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers', id)])
};

const instantiateClassInstances = (data) => {
  console.log(data)
    bookingsLog = new BookingsLog(data[0]);
    roomListings = new RoomListings(data[1]);
    // let customerListing = data[2];
    // customer = new Customer(customerListing.customers[0]);
    customer = new Customer(data[3])
};




//EVENT LISTENERS
window.addEventListener('load', loadData());
logInBtn.addEventListener('onclick', logIn());