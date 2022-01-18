import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';
// import './domUpdates.js';

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//GLOBAL VARIABLES
let bookingsLog, roomListings, customer;


//EXECUTION FUNCTIONS
const loadData = () => {
  getData()
    .then(data => instantiateClassInstances(data))
};


//HELPER FUNCTIONS
const getData = () => {
  return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers')])
};

const instantiateClassInstances = (data) => {
    bookingsLog = new BookingsLog(data[0]);
    roomListings = new RoomListings(data[1]);
    let customerListing = data[2];
    customer = new Customer(customerListing.customers[0]);
    // let customer2 = new Customer(customer.id)
    console.log(bookingsLog, roomListings, customer);
};




//EVENT LISTENERS
window.addEventListener('load', loadData());
