import chai from 'chai';
import BookingsLog from '../src/classes/BookingsLog';
import RoomListings from '../src/classes/RoomListings';
const expect = chai.expect;
import sampleData from '../src/sampleData';

describe('RoomListings', () => {
  let roomListings, bookingsLog;

  beforeEach(() => {
    bookingsLog = new BookingsLog(sampleData.bookings)
    roomListings = new RoomListings(sampleData.rooms)
  });

  it('Should be a function', () => {
    expect(RoomListings).to.be.a('function');
  });

  it('Should be an instance of RoomList', () => {
    expect(roomListings).to.be.an.instanceOf(RoomListings);
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