import chai from 'chai';
import RoomListings from '../src/classes/RoomListings';
const expect = chai.expect;
const rooms = require('../src/sampleData/roomsData');

describe('RoomListings', () => {
  let roomListings;

  beforeEach(() => {
    roomListings = new RoomListings(rooms)
  });

  it('Should be a function', () => {
    expect(RoomListings).to.be.a('function');
  });

  it('Should be an instance of RoomList', () => {
    expect(roomListings).to.be.an.instanceOf(RoomListings);
  });

  it('Should hold all hotel rooms', () => {
    expect(roomListings.hotelRooms).to.equal(rooms);
  });

});