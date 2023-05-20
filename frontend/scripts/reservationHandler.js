function createreservationRow(reservation) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const typeCell = document.createElement('td');
    const doctorCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    const modifyButton = document.createElement('button');
  
    nameCell.textContent = reservation.name;
    dateCell.textContent = reservation.date;
    typeCell.textContent = reservation.type;
    deleteButton.setAttribute('data-reservation-id', reservation.uuid);
    deleteButton.addEventListener('click', handleDeletereservation);
    deleteButton.classList.add('btn', 'btn-danger'); // Aggiungi la classe CSS per il colore desiderato
    deleteButton.textContent = 'Elimina'; // Testo del bottone
    actionCell.appendChild(deleteButton);
    modifyButton.setAttribute('data-reservation-id', reservation.uuid);
    modifyButton.addEventListener('click', handleModifyreservation);
    modifyButton.classList.add('btn', 'btn-primary'); // Aggiungi la classe CSS per il colore desiderato
    modifyButton.textContent = 'Modifica'; // Testo del bottone
    actionCell.appendChild(modifyButton);
  
    row.appendChild(nameCell);
    row.appendChild(dateCell);
    row.appendChild(typeCell)
    row.appendChild(doctorCell)
    row.appendChild(actionCell);
  
    return row;
  }
  
  async function updateReservationsTable() {
    const response = await fetch('http://localhost:3000/reservations');
    const reservations = await response.json();
  
    const reservationsTable = document.getElementById('reservations-table');
    reservationsTable.innerHTML = '';
  
    for (const reservation of reservations) {
      const row = createreservationRow(reservation);
      reservationsTable.appendChild(row);
    }
  }
  async function handleModifyreservation(event) {
    const reservationId = event.target.getAttribute('data-reservation-id');
    const name = prompt('Inserisci il nome dell\'appuntamento:');
    const date = prompt('Inserisci la data dell\'appuntamento:');
    const type = prompt('Inserisci il tipo di appuntamento:');
    if (name.trim() === '' || date.trim() === '' || type.trim() === '') {
        alert('I campi non possono essere vuoti');
        return;
        }
    const response = await fetch(`http://localhost:3000/reservations/${reservationId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name,
        date,
        type
        })
    });
    if (response.ok) {
        await updateReservationsTable();
    } else {
        alert('Errore durante la modifica dell\'appuntamento');
    }
}
async function handleAddreservation() {
    const name = prompt('Inserisci il nome dell\'appuntamento:');
    const date = prompt('Inserisci la data dell\'appuntamento:');
    const type = prompt('Inserisci il tipo di appuntamento (esame, terapia, visita):');
    
    if (name.trim() === '' || date.trim() === '' || type.trim() === '') {
      alert('I campi non possono essere vuoti');
      return;
    }
    
    let typeValue;
    switch (type.trim().toLowerCase()) {
      case 'esame':
        typeValue = 'exam';
        break;
      case 'terapia':
        typeValue = 'therapy';
        break;
      case 'visita':
        typeValue = 'visit';
        break;
      default:
        alert('Tipo di appuntamento non valido');
        return;
    }
    
    const response = await fetch('http://localhost:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        date,
        type: typeValue
      })
    });
  
    if (response.ok) {
      await updateReservationsTable();
    } else {
      alert('Errore durante la creazione dell\'appuntamento');
    }
  }
  
  
  
  async function handleDeletereservation(event) {
    const reservationId = event.target.getAttribute('data-reservation-id');
    const confirmation = confirm('Sei sicuro di voler eliminare questo appuntamento?');
    if (confirmation) {
      const response = await fetch(`http://localhost:3000/reservations/${reservationId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        await updateReservationsTable();
      } else {
        alert('Errore durante l\'eliminazione dell\'appuntamento');
      }
    }
  }

  const addreservationButton = document.getElementById('add-reservation-button');
  addreservationButton.addEventListener('click', handleAddreservation);
  updateReservationsTable();