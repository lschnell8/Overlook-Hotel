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
    expect(bookingsLog.calculateTotalSpent(roomListings, customer1)).to.equal(835.78);

    expect(bookingsLog.calculateTotalSpent(roomListings, customer2)).to.equal(491.14);

    expect(bookingsLog.calculateTotalSpent(roomListings, customer3)).to.equal(0);
  });

  it('Should filter available rooms by a selected date for a customer', () => {
    expect(bookingsLog.getAvailableRooms("2022/02/05", roomListings.hotelRooms)).to.deep.equal([rooms[1], rooms[2], rooms[3]]);

    expect(bookingsLog.getAvailableRooms("2022/01/10", roomListings.hotelRooms)).to.deep.equal([rooms[0], rooms[1], rooms[2]]);

    expect(bookingsLog.getAvailableRooms("2022/01/12", roomListings.hotelRooms)).to.deep.equal([rooms[0], rooms[1], rooms[2], rooms[3]]);

    //THIS TEST PASSES WITH A SECOND SET OF SAMPLE BOOKINGS DATA THAT ARE ALL BOOKED FOR 2022/01/11 AND IS COMMENTED OUT IN THE SAME FILE

    // expect(bookingsLog.getAvailableRooms("2022/01/11", roomListings.hotelRooms)).to.equal(`Sorry friend! There aren't any rooms available for 2022/01/11. Please try another date`);

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