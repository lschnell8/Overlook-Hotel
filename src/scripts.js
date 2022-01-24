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
  // let dateInputValue = dateInput.value.split('-').join('/');
  let dateInputValue = getDateInputValue();
  let roomsToDisplay = bookingsLog.getAvailableRooms(dateInputValue, roomListings);
  roomsToDisplay.forEach(room => {
    domUpdates.displayRooms(room);
  })
  domUpdates.showAvailableRooms();
};

const getFilteredRooms = (event) => {
  event.preventDefault();
  let dropDownSelection = getTypeInputValue();
  if (dropDownSelection === 'false') {
    return domUpdates.displayError(filterError)
  }
  // let dateInputValue = dateInput.value.split('-').join('/');
  let dateInputValue = getDateInputValue();
  let separateByType = bookingsLog.getAvailableRoomsByType(dropDownSelection, dateInputValue, roomListings);
  domUpdates.showFilteredRooms();
  if (typeof separateByType === 'string') {
      domUpdates.displayMessage(separateByType);
    }
  separateByType.forEach(room => {
    domUpdates.displayRooms(room);
  });
};

const selectRoomToBook = (event) => {
  let selectedRoom = findRoom(event);
  domUpdates.displayBookingARoom(selectedRoom);
  domUpdates.showRoomToBook();
}

const submitBooking = (room) => {
  let dateInputValue = getDateInputValue();
  let selectedRoom = room;
  // console.log('ID', bookingARoom.article[article.id])
  // console.log('VALUE',  selected-room.id)
  console.log(selectedRoom)
  let customerBooking = {
    userID: customer.id,
    date: dateInputValue,
    roomNumber: selectedRoom
  }
  console.log(customerBooking)
  // postBooking(customerBooking);
  // domUpdates.hide([bookMyRoomBtn])
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

const getDateInputValue = () => {
  return dateInput.value.split('-').join('/');
};

const findRoom = (event) => {
  return roomListings.hotelRooms.find(room => {
    if (room.number.toString() === event.target.id) {
      return room
    }
  });
};


//EVENT LISTENERS
logInForm.addEventListener('submit', logIn);
findAvailableRoomsBtn.addEventListener('click', apendAvailableRooms);
bookMyRoomBtn.addEventListener('click', submitBooking);
backToDashBtn.addEventListener('click', renderDashboard);
roomTypeSelection.addEventListener('submit', getTypeInputValue);
filterByTypeBtn.addEventListener('click', getFilteredRooms);
roomCards.addEventListener('click', selectRoomToBook);

  export { date, currentDate, bookingsLog, roomListings, customer };