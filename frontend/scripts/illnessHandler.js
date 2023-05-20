function createIllnessRow(illness) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const descriptionCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    const modifyButton = document.createElement('button');
  
    
    nameCell.textContent = illness.name;
    descriptionCell.textContent = illness.description;
    deleteButton.setAttribute('data-illness-id', illness.uuid);
    deleteButton.addEventListener('click', handleDeleteIllness);
    deleteButton.classList.add('btn', 'btn-danger'); 
    deleteButton.textContent = 'Elimina'; 

    modifyButton.setAttribute('data-illness-id', illness.uuid);
    modifyButton.classList.add('btn', 'btn-primary');
    modifyButton.textContent = 'Modifica';
    modifyButton.addEventListener('click', handleModifyIllness);
    actionCell.appendChild(deleteButton);
    actionCell.appendChild(modifyButton);
    
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(actionCell);
    
    return row;
}

async function updateIllnessesTable() {
    const response = await fetch('http://localhost:3000/illnesses');
    const illnesses = await response.json();
    
    const illnessesTable = document.getElementById('illnesses-table');
    illnessesTable.innerHTML = '';
    
    for (const illness of illnesses) {
        const row = createIllnessRow(illness);
        illnessesTable.appendChild(row);
    }
}

async function handleAddIllness() {
    const name = prompt('Inserisci il nome della malattia:');
    const description = prompt('Inserisci la descrizione della malattia:');

    if (name.trim() === '' || description.trim() === '') {
        alert('I campi name e description non possono essere vuoti');
        return;
    }

    const response = await fetch('http://localhost:3000/illnesses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description
        })
    });

    if (response.ok) {
        await updateIllnessesTable();
    } else {
        alert('Errore durante la creazione della malattia');
    }
}

async function handleModifyIllness(event) {
    const illnessId = event.target.getAttribute('data-illness-id');
    const response = await fetch(`http://localhost:3000/illnesses/${illnessId}`);
    const illness = await response.json();
    const name = prompt('Inserisci il nuovo nome della malattia:', illness.name);
    const description = prompt('Inserisci la nuova descrizione della malattia:', illness.description);
    if (name.trim() === '' || description.trim() === '') {
        alert('I campi name e description non possono essere vuoti');
        return;
    }
    const response2 = await fetch(`http://localhost:3000/illnesses/${illnessId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description
        })
    });
    if (response2.ok) {
        await updateIllnessesTable();
    }
    else {
        alert('Errore durante la modifica della malattia');
    }
}

async function handleDeleteIllness(event) {
    const illnessId = event.target.getAttribute('data-illness-id');
    const confirmation = confirm('Sei sicuro di voler eliminare questa malattia?');
    if (confirmation) {
      const response = await fetch(`http://localhost:3000/illnesses/${illnessId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        await updateIllnessesTable();
      } else {
        alert('Errore durante l\'eliminazione della malattia');
      }
    }
  }

const addIllnessButton = document.getElementById('add-illness-button');
addIllnessButton.addEventListener('click', handleAddIllness);

// Aggiorno la tabella delle malattie all'avvio della pagina
updateIllnessesTable();
