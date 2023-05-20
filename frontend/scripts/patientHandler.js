function createPatientRow(patient) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const surnameCell = document.createElement('td');
    const addressCell = document.createElement('td');
    const birthCell = document.createElement('td');
    const phoneCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    const modifyButton = document.createElement('button');
  
    nameCell.textContent = patient.name;
    surnameCell.textContent = patient.surname;
    addressCell.textContent = patient.address;
    birthCell.textContent = patient.birthDate;
    phoneCell.textContent = patient.telephone;
    emailCell.textContent = patient.email;
    deleteButton.setAttribute('data-patient-id', patient.uuid);
    deleteButton.addEventListener('click', handleDeletePatient);
    deleteButton.classList.add('btn', 'btn-danger'); 
    deleteButton.textContent = 'Elimina'; 
    actionCell.appendChild(deleteButton);
    modifyButton.setAttribute('data-patient-id', patient.uuid);
    modifyButton.classList.add('btn', 'btn-primary');
    modifyButton.textContent = 'Modifica';
    modifyButton.addEventListener('click', handleModifyPatient);
    actionCell.appendChild(modifyButton);
  
    row.appendChild(nameCell);
    row.appendChild(surnameCell);
    row.appendChild(addressCell);
    row.appendChild(birthCell);
    row.appendChild(phoneCell);
    row.appendChild(emailCell);
    row.appendChild(actionCell);
  
    return row;
  }
  
  async function updatePatientTable() {
    const response = await fetch('http://localhost:3000/patients');
    const patients = await response.json();
  
    const patientsTable = document.getElementById('patients-table');
    patientsTable.innerHTML = '';
  
    for (const patient of patients) {
      const row = createPatientRow(patient);
      patientsTable.appendChild(row);
    }
  }
  async function handleModifyPatient(event) {
    const patientId = event.target.getAttribute('data-patient-id');
    const response = await fetch(`http://localhost:3000/patients/${patientId}`);
    const patient = await response.json();
    const name = prompt('Inserisci il nome del paziente:', patient.name);
    const surname = prompt('Inserisci il cognome del paziente:', patient.surname);
    const address = prompt('Inserisci l\'indirizzo del paziente:', patient.address);
    const birthDate = prompt('Inserisci la data di nascita del paziente:', patient.birthDate);
    const telephone = prompt('Inserisci il numero di telefono del paziente:', patient.telephone);
    const email = prompt('Inserisci l\'email del paziente:', patient.email);
    if (name.trim() === '' || surname.trim() === '' || address.trim() === '' || birthDate.trim() === '' || telephone.trim() === '' || email.trim() === '') {
        alert('I campi non possono essere vuoti');
        return;
    }
    const response2 = await fetch(`http://localhost:3000/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          surname,
          address,
          birthDate,
          telephone,
          email
        })
    });
    if (response2.ok) {
        await updatePatientTable();
    }
    else {
        alert('Errore durante la modifica del paziente');
    }
  }
  async function handleAddPatient() {
    const name = prompt('Inserisci il nome del paziente:');
    const surname = prompt('Inserisci il cognome del paziente:');
    const address = prompt('Inserisci l\'indirizzo del paziente:');
    const birthDate = prompt('Inserisci la data di nascita del paziente:');
    const telephone = prompt('Inserisci il numero di telefono del paziente:');
    const email = prompt('Inserisci l\'email del paziente:');
    if (name.trim() === '' || surname.trim() === '' || address.trim() === '' || birthDate.trim() === '' || telephone.trim() === '' || email.trim() === '') {
        alert('I campi non possono essere vuoti');
        return;
    }

    const response = await fetch('http://localhost:3000/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        surname,
        address,
        birthDate,
        telephone,
        email
      })
    });
  
    if (response.ok) {
      await updatePatientTable();
    } else {
      alert('Errore durante la creazione del paziente');
    }
  }
  
  async function handleDeletePatient(event) {
    const patientId = event.target.getAttribute('data-patient-id');
    const confirmation = confirm('Sei sicuro di voler eliminare questo paziente?');
    if (confirmation) {
      const response = await fetch(`http://localhost:3000/patients/${patientId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        await updatePatientTable();
      } else {
        alert('Errore durante l\'eliminazione dell\'esame');
      }
    }
  }

  const addPatientButton = document.getElementById('add-patient-button');
  addPatientButton.addEventListener('click', handleAddPatient);
  updatePatientTable();