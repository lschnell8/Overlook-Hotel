import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
import domUpdates from './domUpdates.js';
import './css/base.scss';

//BUTTONS, INPUTS, AND SUBMITS
const logInForm = document.getElementById('logIn');
const roomTypeInput = document.getElementById('typeInput');
const roomSearchForm = document.getElementById('roomSearch');

// const findAvailableRoomsBtn = document.getElementById('findAvailableRoomsBtn');
// const backToDashBtn = document.getElementById('backToDashBtn');
// const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');

//GLOBAL VARIABLES
let bookingsLog, roomListings, customer;
let currentDate = new Date().toJSON().slice(0, 10);
let date = currentDate.split("-").join("/");

//EXECUTION FUNCTIONS
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
  // usernameInput.innerText = '';
  // passwordInput.innerText = '';
};

const apendAvailableRooms = (event) => {
  console.log(currentDate)
  event.preventDefault();
  let dateInputValue = dateInput.value.split('-').join('/');


  domUpdates.displayAvailableRooms(logInForm, roomListings, bookingsLog, dateInputValue);
};

const getFilteredRooms = () => {
  let roomStyle = roomTypeInput.value;
  // console.log(roomStyle)
  let separateByType = bookingsLog.getAvailableRoomsByType(roomStyle, date, roomListings);
  console.log(separateByType)
  separateByType.forEach(room => {
    domUpdates.displayFilteredRooms(room);
  });
};

// const postBooking = () => {

// };


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
roomTypeSelection.addEventListener('submit', getFilteredRooms)
// backToDashBtn.addEventListener('click', domUpdates.displayDashboard(customer, bookingsLog, roomListings, logInForm));
// bookMyRoomBtn.addEventListener('click', postBooking)

export default { logInForm, date, currentDate, roomTypeSelection, bookingsLog, roomListings, customer}