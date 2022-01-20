import { fetchApiData, submitBooking } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
import domUpdates from './domUpdates.js';
import './css/base.scss';

//BUTTONS, INPUTS, AND SUBMITS
const logInForm = document.getElementById('logInForm');
const roomTypeSelection = document.getElementById('roomTypeSelection');
const filterByTypeBtn = document.getElementById('filterByType');
const findAvailableRoomsBtn = document.getElementById('findAvailableRoomsBtn');
const backToDashBtn = document.getElementById('backToDashBtn');
const bookMyRoomBtn = document.getElementById('bookMyRoomBtn');

//GLOBAL VARIABLES
let bookingsLog, roomListings, customer;
let currentDate = new Date().toJSON().slice(0, 10);
let date = currentDate.split("-").join("/");

//EXECUTION FUNCTIONS
const logIn = (event) => {
  event.preventDefault()
  let userValue = usernameInput.value.split('r')[1]
  if (userValue > 50 || 0 > userValue || passwordInput.value !== 'overlook2021') {
    domUpdates.displayLoginInputError();
  } else {
  let id = usernameInput.value.split('r')[1];
    getData(id)
    .then(data => {
      renderDashboard();
    }) 
  }    
};
    
const getFilteredRooms = (event) => {
  event.preventDefault();
  let dropDownSelection = getInputValue();
  console.log('S-47 gFR Select Option Value', typeInput.value, 'variable', dropDownSelection);
  let separateByType = bookingsLog.getAvailableRoomsByType(dropDownSelection, date, roomListings);
  console.log('S-50 gFR separateByType', separateByType);
  separateByType.forEach(room => {
    domUpdates.displayFilteredRooms(room);
  });
  domUpdates.showFilteredRooms();
};

const postBooking = () => {
  
};

const renderDashboard = () => {
  domUpdates.displayDashboard(customer, bookingsLog, roomListings, date)
  domUpdates.showDashboard();
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

const apendAvailableRooms = (event) => {
  event.preventDefault();
  domUpdates.displayAvailableRooms(roomListings, bookingsLog);
  domUpdates.showAvailableRooms();
};

const getInputValue = () => {
  const typeInput = document.getElementById('typeInput');
  let selection = typeInput.options[typeInput.selectedIndex].value;
    return selection
};


//EVENT LISTENERS
logInForm.addEventListener('submit', logIn);
findAvailableRoomsBtn.addEventListener('click', apendAvailableRooms);
bookMyRoomBtn.addEventListener('click', postBooking);
backToDashBtn.addEventListener('click', renderDashboard);
roomTypeSelection.addEventListener('submit', getInputValue)
filterByTypeBtn.addEventListener('click', getFilteredRooms);

export { logInForm, date, currentDate, bookingsLog, roomListings, customer }