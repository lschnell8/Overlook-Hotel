//GET
export const fetchApiData = (type, id) => {
  let dataRequest;
  if (!id) {
    dataRequest = `http://localhost:3001/api/v1/${type}`

  } else {
   dataRequest = `http://localhost:3001/api/v1/${type}/${id}`
  }
  return fetch(`${dataRequest}`)
    .then((response) =>
      response.json())
    .catch(error => console.log('fetch error', error))
};

//POST
export const postBooking = (customerBooking) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerBooking)
  })
    .then(response => postError(response))
};

const postError = (response) => {
  if (!response.ok) {
    throw "Booking failed, please try again."
  }
  return response.json()
}