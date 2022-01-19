import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
import domUpdates from './domUpdates.js';
import './css/base.scss';

//BUTTONS AND SUBMITS
const logInForm = document.getElementById('logIn');

// const findAvailableRoomsBtn = document.getElementById('findAvailableRoomsBtn');
// const backToDashBtn = document.getElementById('backToDashBtn');
const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');

//INPUTS
const roomTypeSelection = document.getElementById('typeInput');
// const usernameInput = document.getElementById('usernameInput');
// const passwordInput = document.getElementById('passwordInput');
// const dateInput = document.getElementById('dateInput').value;
const roomSearchForm = document.getElementById('roomSearch');
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
let currentDate = new Date().toJSON().slice(0, 10);
let date = currentDate.split("-").join("/");
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
      domUpdates.displayDashboard(customer, bookingsLog, roomListings, logInForm, date)
    }) 
  }
};

const apendAvailableRooms = (event) => {
  event.preventDefault();
  domUpdates.displayAvailableRooms(roomListings, bookingsLog, logInForm);
};

const getFilteredRooms = () => {
  debugger;
  let roomStyle = roomTypeSelection.value;
  console.log(roomStyle)
  let separateByType = bookingsLog.getAvailableRoomsByType(roomStyle, date, roomListings);
  console.log(separateByType)
  separateByType.forEach(room => {
    room
    domUpdates.displayFilteredRooms();
  });
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
// roomTypeSelection.addEventListener('submit', getFilteredRooms)
backToDashBtn.addEventListener('click', domUpdates.displayDashboard(customer, bookingsLog, roomListings, logInForm));
bookMyRoomBtn.addEventListener('click', postBooking)

export default { logInForm, date, currentDate, roomTypeSelection}