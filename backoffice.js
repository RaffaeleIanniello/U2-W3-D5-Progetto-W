
const URL = 'https://striveschool-api.herokuapp.com/api/product/'


const addressBarContent = new URLSearchParams(location.search)

const eventId = addressBarContent.get('id')
console.log('EVENTID', eventId)
if (eventId) {
  
  document.querySelector('.btn-primary').innerText = 'Modifica evento'
  // cambio il contenuto dell'h1
  document.querySelector('h1').innerText = 'EpiTicket - Modifica evento'
  
  fetch(URL + eventId)
    .then((res) => {
      if (res.ok) {
        return res.json() // ho bisogno dei dettagli dell'evento!
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((detail) => {
      console.log('DETAIL', detail)
      // ripopolo il form
      const nameInput = document.getElementById('event-name')
      const descriptionInput = document.getElementById('event-description')
      const brandInput = document.getElementById('event-brand')
      const imageInput = document.getElementById('event-image')
      const priceInput = document.getElementById('event-price')
      
      nameInput.value = detail.name
      descriptionInput.value = detail.description
      brandInput.value = detail.brand
      imageInput.value = detail.image
      priceInput.value = detail.price
     
    })
    .catch((err) => console.log(err))
}

// dobbiamo recuperare i valori dai campi, impacchettarli in un oggetto e inviare questo oggetto tramite
// una fetch con method POST

// prendiamo un riferimento al form
const eventForm = document.getElementById('event-form')
eventForm.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log('raccolgo i dati dal form')

  // prendiamo i riferimenti agli input field
  const nameInput = document.getElementById('event-name')
  const descriptionInput = document.getElementById('event-description')
  const brandInput = document.getElementById('event-brand')
  const imageInput = document.getElementById('event-image')
  const priceInput = document.getElementById('event-price')


  // ora raccolgo i loro .value e impacchetto il mio oggetto:
  let newEvent = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageInput.value,
    price: priceInput.value,
   
    
  }

  console.log('ecco i valori recuperati dal form:', newEvent)

  

 

  
  let urlToUse
  if (eventId) {
    urlToUse = URL + eventId
  } else {
    urlToUse = 'https://striveschool-api.herokuapp.com/api/product'
  }

  let methodToUse
  if (eventId) {
    methodToUse = 'PUT'
  } else {
    methodToUse = 'POST'
  }
console.log(urlToUse)
  fetch(urlToUse, {
    method: methodToUse, 
    body: JSON.stringify(newEvent), 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4Mjg2ZjEyYjUwYzAwMTQ5ZTYzNjciLCJpYXQiOjE2ODg3NDE5OTksImV4cCI6MTY4OTk1MTU5OX0.4CRj5V8zNMX5Dl03fSFNVUSAK1UId1TqULVjf4rj0ls",

      'Content-Type': 'application/json',
    },
  
  })
    .then((res) => {
      console.log(res)
      if (res.ok) {
       
        
        alert('PRODOTTO SALVATO!')
   
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        brandInput.value = ''
        imageInput.value = ''
        location.assign('index.html')
      } else {
       
        throw new Error("Errore nel salvataggio dell'evento")
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
