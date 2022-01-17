class BookingsLog {
  constructor(bookings) {
    this.bookings = bookings;
  }

  getCustomerBookings(customer) {
    return this.bookings.filter(booking => customer.id === booking.userID)
  }

  calculateTotalSpent(roomListings, customer) {
    const customerBookings = this.getCustomerBookings(customer);
    return roomListings.hotelRooms.reduce((acc, listing) => {
      customerBookings.forEach(customerBooking => {
        if (customerBooking.roomNumber === listing.number) {
          acc += listing.costPerNight
        }
      })
      return acc
    }, 0)
  }

  getAvailableRooms(date, roomListings) {
    //for the date passed in I will need to verify that the date is valid and is either the current date or a future date - I think I need to either parse the date for comparison or days.js for this.
    const unavailableBookings = this.bookings.filter(booking => date === booking.date);
    const filteredRooms = roomListings.reduce((acc, listing) => {
      if (!unavailableBookings.length) {
        acc.push(listing)
      } else {
        unavailableBookings.forEach(booking => {
          if (booking.roomNumber !== listing.number && !acc.includes(listing)) {
            acc.push(listing)
          }
        })
      }
        return acc
      }, [])
    if (unavailableBookings.length === this.bookings.length) {
      return `Sorry friend! There aren't any rooms available for ${date}. Please try another date`
    } else {
      return filteredRooms
    }
  } 

  getAvailableRoomsByType(type, date, roomListings) {
    const availableRooms = this.getAvailableRooms(date, roomListings);
    const roomsByType = availableRooms.filter(room => room.roomType === type)
    if (!roomsByType.length) {
      return `There are no ${type}s available. Please select another room type.`
    } else {
      return roomsByType
    }
  }

};

export default BookingsLog;