function createTherapyRow(therapy) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const descriptionCell = document.createElement('td');
    const priceCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    const modifyButton = document.createElement('button');
  
    nameCell.textContent = therapy.name;
    descriptionCell.textContent = therapy.description;
    priceCell.textContent = therapy.price;
    deleteButton.setAttribute('data-therapy-id', therapy.uuid);
    deleteButton.addEventListener('click', handleDeletetherapy);
    deleteButton.classList.add('btn', 'btn-danger'); 
    deleteButton.textContent = 'Elimina'; 
    actionCell.appendChild(deleteButton);
    modifyButton.setAttribute('data-therapy-id', therapy.uuid);
    modifyButton.classList.add('btn', 'btn-primary');
    modifyButton.textContent = 'Modifica';
    modifyButton.addEventListener('click', handleModifytherapy);
    actionCell.appendChild(modifyButton);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(actionCell);
  
    return row;
  }
  async function handleModifytherapy(event) {
    const therapyId = event.target.getAttribute('data-therapy-id');
    const response = await fetch(`http://localhost:3000/therapies/${therapyId}`);
    const therapy = await response.json();
    const name = prompt('Inserisci il nome della terapia:', therapy.name);
    const description = prompt('Inserisci la descrizione della terapia:', therapy.description);
    const price = prompt('Inserisci il prezzo della terapia:', therapy.price);
    if (name.trim() === '' || description.trim() === '' || price.trim() === '') {
      alert('I campi name e description non possono essere vuoti');
      return;
    }
    const response2 = await fetch(`http://localhost:3000/therapies/${therapyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        price
      })
    });
  
    if (response2.ok) {
      await updateTherapyTable();
    } else {
      alert('Errore durante la modifica della terapia');
    }
  }
  async function updateTherapyTable() {
    const response = await fetch('http://localhost:3000/therapies');
    const therapies = await response.json();
  
    const therapiesTable = document.getElementById('therapy-table');
    therapiesTable.innerHTML = '';
  
    for (const therapy of therapies) {
      const row = createTherapyRow(therapy);
      therapiesTable.appendChild(row);
    }
  }
  
  async function handleAddtherapy() {
    const name = prompt('Inserisci il nome della terapia:');
    const description = prompt('Inserisci la descrizione della terapia:');
    const price = prompt('Inserisci il prezzo della terapia:');
    if (name.trim() === '' || description.trim() === '' || price.trim() === '') {
      alert('I campi name e description non possono essere vuoti');
      return;
    }
    const response = await fetch('http://localhost:3000/therapies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        price
      })
    });
  
    if (response.ok) {
      await updateTherapyTable();
    } else {
      alert('Errore durante la creazione della terapia');
    }
  }
  
  async function handleDeletetherapy(event) {
    const therapyId = event.target.getAttribute('data-therapy-id');
    const confirmation = confirm('Sei sicuro di voler eliminare questa terapia?');
    if (confirmation) {
      const response = await fetch(`http://localhost:3000/therapies/${therapyId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        await updateTherapyTable();
      } else {
        alert('Errore durante l\'eliminazione della terapia');
      }
    }
  }

  const addtherapyButton = document.getElementById('add-therapy-button');
  addtherapyButton.addEventListener('click', handleAddtherapy);
  updateTherapyTable();