import { fetchApiData, postBooking } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
import domUpdates from './domUpdates.js';
import './css/base.scss';

//BUTTONS, INPUTS, AND SUBMITS
// const logInForm = document.getElementById('logInForm');
// const roomTypeSelection = document.getElementById('roomTypeSelection');
const filterByTypeBtn = document.getElementById('filterByType');
// const findAvailableRoomsBtn = document.getElementById('findAvailableRoomsBtn');
// const backToDashBtn = document.getElementById('backToDashBtn');
// const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');

//GLOBAL VARIABLES
let bookingsLog, roomListings, customer;
let currentDate = new Date().toJSON().slice(0, 10);
let date = currentDate.split("-").join("/");

//EXECUTION FUNCTIONS
const logIn = (event) => {
  event.preventDefault()
  // let userValue = usernameInput.value.split('r')[1]
  // if (userValue > 50 || 0 > userValue || passwordInput.value !== 'overlook2021') {
  //   domUpdates.displayError(loginError);
  // } else {
  let id = usernameInput.value.split('r')[1];
    getData(id)
      .then(data => {
        domUpdates.displayDashboard(customer, bookingsLog, roomListings, date);
        domUpdates.displayDateSelection();
        domUpdates.showDashboard();
    }) 
    // }    
};   
const renderDashboard = () => {
  dateInput.value = '';
  domUpdates.showDashboard();
  domUpdates.displayDashboard(customer, bookingsLog, roomListings, date);
};
  
const apendAvailableRooms = (event) => {
  if (!dateInput.value) {
    return domUpdates.show([searchDate])
  }
  roomCards.innerHTML = '';
  event.preventDefault();
  let dateInputValue = dateInput.value.split('-').join('/');
  let roomsToDisplay = bookingsLog.getAvailableRooms(dateInputValue, roomListings);
  roomsToDisplay.forEach(room => {
    domUpdates.displayRooms(room);
  })
  domUpdates.showAvailableRooms();
};

const getFilteredRooms = (event) => {
  event.preventDefault();
  let dropDownSelection = getTypeInputValue();
  let dateInputValue = dateInput.value.split('-').join('/');
  let separateByType = bookingsLog.getAvailableRoomsByType(dropDownSelection, dateInputValue, roomListings);
  domUpdates.showFilteredRooms()
  separateByType.forEach(room => {
    domUpdates.displayRooms(room);
  });
};

const submitBooking = () => {
  postBooking();
  domUpdates.hide([bookMyRoomBtn])
};


//HELPER FUNCTIONS
const getData = (id) => {
  return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers', id)]).then(data => instantiateClassInstances(data))
};

const instantiateClassInstances = (data) => {
  bookingsLog = new BookingsLog(data[0].bookings);
  roomListings = new RoomListings(data[1].rooms);
  customer = new Customer(data[2]);
};

const getTypeInputValue = () => {
  const typeInput = document.getElementById('typeInput');
  let selection = typeInput.options[typeInput.selectedIndex].value;
    return selection
};


//EVENT LISTENERS
logInForm.addEventListener('submit', logIn);
findAvailableRoomsBtn.addEventListener('click', apendAvailableRooms);
bookMyRoomBtn.addEventListener('click', submitBooking);
backToDashBtn.addEventListener('click', renderDashboard);
roomTypeSelection.addEventListener('submit', getTypeInputValue)
filterByTypeBtn.addEventListener('click', getFilteredRooms);

  export { date, currentDate, bookingsLog, roomListings, customer };