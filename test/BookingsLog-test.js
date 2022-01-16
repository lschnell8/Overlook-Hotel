import chai from 'chai';
const expect = chai.expect;
import BookingsLog from '../src/classes/BookingsLog';
import RoomListings from '../src/classes/RoomListings';
import sampleData from '../src/sampleData';


describe('BookingsLog', () => {
  let bookingsLog, roomListings;

  beforeEach(() => {
    bookingsLog = new BookingsLog(sampleData.bookings)
    roomListings = new RoomListings(sampleData.rooms)
  });

  it('Should be a function', () => {
    expect(BookingsLog).to.be.a('function');
  });

  it('Should be an instance of BookingsLog', () => {
    expect(bookingsLog).to.be.an.instanceOf(BookingsLog);
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