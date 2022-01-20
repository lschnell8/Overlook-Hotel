import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
import domUpdates from './domUpdates.js';
import './css/base.scss';

//BUTTONS, INPUTS, AND SUBMITS
const logInForm = document.getElementById('logIn');
const roomTypeSelection = document.getElementById('typeInput');
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
  // let userValue = usernameInput.value.split('r')[1]
  // if (userValue > 50 || 0 > userValue || passwordInput.value !== 'overlook2021') {
    //   domUpdates.displayLoginInputError();
    // } else {
      let id = usernameInput.value.split('r')[1];
      getData(id)
      .then(data => {
        domUpdates.displayDashboard(customer, bookingsLog, roomListings, logInForm, date)
      }) 
      // }
      // usernameInput.innerText = '';
      // passwordInput.innerText = '';
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

const apendAvailableRooms = (event) => {
  event.preventDefault();
  domUpdates.displayAvailableRooms(logInForm, roomListings, bookingsLog);
};

const getFilteredRooms = (event) => {
  event.preventDefault()
  let roomStyle = roomTypeInput.value;
  console.log('S-47 gFR roomStyle', roomStyle)
  let separateByType = bookingsLog.getAvailableRoomsByType(roomStyle, date, roomListings);
  console.log('S-50 gFR separateByType', separateByType)
  separateByType.forEach(room => {
    domUpdates.displayFilteredRooms(room);
  });
};

// const postBooking = () => {

// };




//EVENT LISTENERS
logInForm.addEventListener('submit', logIn);
// findAvailableRoomsBtn.addEventListener('click', apendAvailableRooms);
roomSearchForm.addEventListener('submit', apendAvailableRooms)
roomTypeSelection.addEventListener('submit', getFilteredRooms)
// backToDashBtn.addEventListener('click', domUpdates.displayDashboard(customer, bookingsLog, roomListings, logInForm));
// bookMyRoomBtn.addEventListener('click', postBooking)

export { logInForm, date, currentDate, roomTypeSelection, bookingsLog, roomListings, customer}