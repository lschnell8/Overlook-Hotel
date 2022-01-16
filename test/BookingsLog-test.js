import chai from 'chai';
const expect = chai.expect;
import BookingsLog from '../src/classes/BookingsLog';
import RoomListings from '../src/classes/RoomListings';
import Customer from '../src/classes/Customer';
const bookings = require('../src/sampleData/bookingsData');
const rooms = require('../src/sampleData/roomsData');
const customers = require('../src/sampleData/customersData');

describe('BookingsLog', () => {
  let bookingsLog, roomListings, customer1, customer2, customer3;

  beforeEach(() => {
    bookingsLog = new BookingsLog(bookings);
    roomListings = new RoomListings(rooms);
    customer1 = new Customer(customers[0].id, customers[0].name);
    customer2 = new Customer(customers[1].id, customers[1].name);
    customer3 = new Customer(customers[2].id, customers[2].name);
  });

  it('Should be a function', () => {
    expect(BookingsLog).to.be.a('function');
  });

  it('Should be an instance of BookingsLog', () => {
    expect(bookingsLog).to.be.an.instanceOf(BookingsLog);
  });

  it('Should hold all bookings', () => {
    expect(bookingsLog.bookings).to.equal(bookings);
  });

  it('Should filter a customer\'s bookings', () => {
    expect(bookingsLog.getCustomerBookings(customer1)).to.deep.equal([bookings[0], bookings[1]]);
    expect(bookingsLog.getCustomerBookings(customer2)).to.deep.equal([bookings[2]]);
    expect(bookingsLog.getCustomerBookings(customer3)).to.deep.equal([]);
  });

  it('Should calculate the total amount a customer has spent on room bookings', () => {
    // bookingsLog.getCustomerBookings(customer1)
    expect(bookingsLog.calculateTotalSpent(roomListings, customer1)).to.equal(835.78);

    // bookingsLog.getCustomerBookings(customer2)
    expect(bookingsLog.calculateTotalSpent(roomListings, customer2)).to.equal(358.40);

    // bookingsLog.getCustomerBookings(customer3)
    expect(bookingsLog.calculateTotalSpent(roomListings, customer3)).to.equal(0);
  });

  it('Should ', () => {
    expect().to.equal();
  });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

  // it('Should', () => {
  //   expect().to.equal();
  // });

});