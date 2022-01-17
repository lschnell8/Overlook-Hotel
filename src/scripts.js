import { fetchApiData } from './apiCalls';
import BookingsLog from './classes/BookingsLog';
import RoomListings from './classes/RoomListings';
import Customer from './classes/Customer';

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let bookingsLog, roomListings, customer;

console.log('This is the JavaScript entry file - your code begins here.');
const loadData = () => {
  getData()
  .then(instantiateClasses())
};

const getData = () => {
  return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers')])
};

const instantiateClasses = () => {
  (data) => {
    bookingsLog = new BookingsLog(data[0]);
    roomListings = new RoomListings(data[1]);
    let customerListing = data[2];
    customer = new Customer(customerListing.customers[0]);
  }
};

window.addEventListener('load', loadData())