const getEventData = function () {
    const URL = 'https://striveschool-api.herokuapp.com/api/product/'
   
    fetch(URL,  {
      method: 'GET', 
     
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4Mjg2ZjEyYjUwYzAwMTQ5ZTYzNjciLCJpYXQiOjE2ODg3NDE5OTksImV4cCI6MTY4OTk1MTU5OX0.4CRj5V8zNMX5Dl03fSFNVUSAK1UId1TqULVjf4rj0ls",
  
        'Content-Type': 'application/json',
      },
    
    })
      .then((res) => {
        console.log('Response della GET', res)
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Errore nella chiamata API')
        }
      })
      .then((events) => {
        // entriamo qua se abbiamo ritornato res.json() dal .then() precedente
        console.log('EVENTS', events)
        // nascondo lo spinner
        const spinnerContainer = document.getElementById('spinner-container')
        spinnerContainer.classList.add('d-none')
        // abbiamo gli eventi salvati!
        // creiamo dinamicamente le card a partire dagli eventi recuperati:
        events.forEach((event) => {
          let newCol = document.createElement('div')
          newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')
          newCol.innerHTML = `
            <div class="card">
                <img
                  src="${event.imageUrl}"
                  class="w-100 rounded-start"
                  alt="concert placeholder image"
                />
                <div class="card-body">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">
                    ${event.description}
                  </p>
                  <p class="card-text">
                    ${event.brand} 
                  </p>
                  <p class="card-text fw-bold">
                    ${event.price}€
                  </p>
                  <a href="./detail.html?id=${event._id}" class="btn btn-primary">Scopri di più</a>
                </div>
              </div>
          `
          const eventsRow = document.getElementById('events-row')
          eventsRow.appendChild(newCol)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  getEventData()