
class BookingsLog {
  constructor(bookings) {
    this.bookings = bookings;
  }

  getCustomerBookings(customer) {
    return this.bookings.filter(booking => customer.id === booking.userID)
  }

  calculateTotalSpent(roomListings, customer) {
    const customerBookings = this.getCustomerBookings(customer);
    return customerBookings.reduce((acc, customerBooking) => {
      roomListings.hotelRooms.forEach(listing => {
        if (customerBooking.roomNumber === listing.number) {
          acc += listing.costPerNight
        }
      })
      return acc
    }, 0)
  }

  getAvailableRooms(date, roomListings) {
    const filteredBookings = this.bookings.filter(booking => date !== booking.date);
    const filteredRooms = roomListings.reduce(listing => {
      filteredBookings.forEach(booking => {
        if (booking.roomNumber === listing.number && !acc.includes(listing)) {
          acc.push(listing)
        }
      }, [])
    })
    if (!filteredBookings.length) {
      return `Sorry friend! There aren't any rooms available for ${date}. Please try another date`
    } else {
      return filteredRooms
    }
  } 

};

export default BookingsLog;