import chai from 'chai';
const expect = chai.expect;
import BookingsLog from '../src/classes/BookingsLog';
import RoomListings from '../src/classes/RoomListings';
import Customer from '../src/classes/Customer';
const bookings = require('../src/sampleData/bookingsData');
const bookings2 = require('../src/sampleData/allBookedData');
const rooms = require('../src/sampleData/roomsData');
const customers = require('../src/sampleData/customersData');

describe('BookingsLog', () => {
  let bookingsLog, bookingsLog2, roomListings, customer1, customer2, customer3;

  beforeEach(() => {
    bookingsLog = new BookingsLog(bookings);
    bookingsLog2 = new BookingsLog(bookings2);
    roomListings = new RoomListings(rooms);
    customer1 = new Customer(customers[0]);
    customer2 = new Customer(customers[1]);
    customer3 = new Customer(customers[2]);
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
    expect(bookingsLog.getAvailableRooms('2022/02/05', roomListings)).to.deep.equal([rooms[1], rooms[2], rooms[3]]);

    expect(bookingsLog.getAvailableRooms('2022/01/10', roomListings)).to.deep.equal([rooms[0], rooms[1], rooms[2]]);

    expect(bookingsLog.getAvailableRooms('2022/01/12', roomListings)).to.deep.equal([rooms[0], rooms[1], rooms[2], rooms[3]]);

    expect(bookingsLog2.getAvailableRooms('2022/01/11', roomListings)).to.equal(`Sorry friend! There aren't any rooms available for 2022/01/11. Please try another date`);
  });

  it('Should filter available rooms by type', () => {
    expect(bookingsLog.getAvailableRoomsByType('residential suite', '2022/01/12', roomListings)).to.deep.equal([rooms[0], rooms[3]]);
    
    expect(bookingsLog.getAvailableRoomsByType('single room', '2022/01/12', roomListings)).to.deep.equal([rooms[2]]);

    expect(bookingsLog.getAvailableRoomsByType('junior suite', '2022/01/12', roomListings)).to.equal(`Sorry! There are no junior suites available.`);
  });

});