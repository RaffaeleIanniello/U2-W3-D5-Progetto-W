const URL = 'https://striveschool-api.herokuapp.com/api/product'

// recuperiamo il parametro "id" dalla address bar:
const addressBarContent = new URLSearchParams(location.search)

const eventId = addressBarContent.get('id')
console.log('EVENTID', eventId)
console.log(URL + eventId)


fetch(URL + eventId)
  .then((res) => {
    if (res.ok) {
      return res.json() 
    } else {
      throw new Error("Errore nel recupero dei dettagli del prodotto")
    }
  })
  .then((detail) => {
    console.log('DETAIL', detail)
    // manipolo il DOM
    // nascondo lo spinner
    const spinnerContainer = document.getElementById('spinner-container')
    spinnerContainer.classList.add('d-none')
    let newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-sm-6', 'text-center')
    newCol.innerHTML = `
          <div class="card">
              <img
                src="${detail.imageUrl}"
                class="card-img-top"
                alt="concert placeholder image"
              />
              <div class="card-body">
                <h5 class="card-title">${detail.name}</h5>
                <p class="card-text">
                  ${detail.description}
                </p>
                <p class="card-text">
                  ${detail.brands}
                </p>
                <p class="card-text fw-bold">
                  ${detail.price}€
                </p>
                <div>
                <a href="./backoffice.html?id=${detail._id}" class="btn btn-warning">MODIFICA EVENTO</a>
                <button type="button" class="btn btn-danger">ELIMINA EVENTO</button>
                </div>
              </div>
            </div>
        `
    const eventsRow = document.getElementById('events-row')
    eventsRow.appendChild(newCol)

    // assegno al pulsante elimina il suo comportamento
    let deleteButton = document.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
      // dobbiamo eliminare la risorsa con una fetch con method "DELETE"
      // come funziona una fetch con method "DELETE"? semplicissima :)
      fetch(URL + eventId, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            // abbiamo eliminato l'evento con successo!
            alert('EVENTO ELIMINATO!')
            location.assign('index.html')
          } else {
            // c'è stato un problema nell'eliminazione dell'evento
            throw new Error("Problema nell'eliminazione dell'evento")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  })
  .catch((err) => {
    console.log(err)
  })

