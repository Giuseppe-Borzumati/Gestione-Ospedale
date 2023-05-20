function createdoctorRow(doctor) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const specCell = document.createElement('td');
    const patientCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    const modifyButton = document.createElement('button');
  
    nameCell.textContent = doctor.name;
    specCell.textContent = doctor.specialization;
    patientCell.textContent = doctor.patient;
    deleteButton.setAttribute('data-doctor-id', doctor.uuid);
    deleteButton.addEventListener('click', handleDeleteDoctor);
    deleteButton.classList.add('btn', 'btn-danger'); 
    deleteButton.textContent = 'Elimina'; 
    actionCell.appendChild(deleteButton);
    modifyButton.setAttribute('data-doctor-id', doctor.uuid);
    modifyButton.addEventListener('click', handleModifyDoctor);
    modifyButton.classList.add('btn', 'btn-primary'); 
    modifyButton.textContent = 'Modifica'; 
    actionCell.appendChild(modifyButton);
  
    row.appendChild(nameCell);
    row.appendChild(specCell);
    row.appendChild(patientCell)
    row.appendChild(actionCell);
  
    return row;
  }
  
  async function updatedoctorsTable() {
    const response = await fetch('http://localhost:3000/doctors');
    const doctors = await response.json();
  
    const doctorsTable = document.getElementById('doctors-table');
    doctorsTable.innerHTML = '';
  
    for (const doctor of doctors) {
      const row = createdoctorRow(doctor);
      doctorsTable.appendChild(row);
    }
  }

    async function handleModifyDoctor(event) {
    const doctorId = event.target.getAttribute('data-doctor-id');
    const response = await fetch(`http://localhost:3000/doctors/${doctorId}`);
    const doctor = await response.json();
    const name = prompt('Inserisci il nome del dottore:', doctor.name);
    const specialization = prompt('Inserisci la specializzazione del dottore:', doctor.specialization);
    if (name.trim() === '' || specialization.trim() === '') {
        alert('I campi name e description non possono essere vuoti');
        return;
    }
    const response2 = await fetch(`http://localhost:3000/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name,
        specialization
        })
    });
    if (response2.ok) {
        await updatedoctorsTable();
    } else {
        alert('Errore durante la modifica del dottore');
    }
}
  
  async function handleAdddoctor() {
    const name = prompt('Inserisci il nome del dottore:');
    const specialization = prompt('Inserisci la specializzazione del dottore:');
    if (name.trim() === '' || specialization.trim() === '') {
      alert('I campi name e description non possono essere vuoti');
      return;
    }
    const response = await fetch('http://localhost:3000/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        specialization,
        patients: []
      })
    });
    console.log('response', response)
    if (response.ok) {
      await updatedoctorsTable();
    } else {
      alert('Errore durante la creazione del dottore');
    }
  }
  
  async function handleDeleteDoctor(event) {
    const doctorId = event.target.getAttribute('data-doctor-id');
    const confirmation = confirm('Sei sicuro di voler eliminare questo dottore?');
    if (confirmation) {
      const response = await fetch(`http://localhost:3000/doctors/${doctorId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        await updatedoctorsTable();
      } else {
        alert('Errore durante l\'eliminazione del dottore');
      }
    }
  }

  const adddoctorButton = document.getElementById('add-doctor-button');
  adddoctorButton.addEventListener('click', handleAdddoctor);
  updatedoctorsTable();