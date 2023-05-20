function createExamRow(exam) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const descriptionCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    const modifyButton = document.createElement('button');
  
    nameCell.textContent = exam.name;
    descriptionCell.textContent = exam.description;
    deleteButton.setAttribute('data-exam-id', exam.uuid);
    deleteButton.addEventListener('click', handleDeleteExam);
    deleteButton.classList.add('btn', 'btn-danger'); 
    deleteButton.textContent = 'Elimina'; 
    modifyButton.setAttribute('data-exam-id', exam.uuid);
    modifyButton.addEventListener('click', handleModifyExam);
    modifyButton.classList.add('btn', 'btn-primary'); 
    modifyButton.textContent = 'Modifica'; 
    actionCell.appendChild(deleteButton);
    actionCell.appendChild(modifyButton);
  
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(actionCell);
  
    return row;
  }
  
  async function updateExamsTable() {
    const response = await fetch('http://localhost:3000/exams');
    const exams = await response.json();
  
    const examsTable = document.getElementById('exams-table');
    examsTable.innerHTML = '';
  
    for (const exam of exams) {
      const row = createExamRow(exam);
      examsTable.appendChild(row);
    }
  }

  async function handleModifyExam(event) {
    const examId = event.target.getAttribute('data-exam-id');
    const response = await fetch(`http://localhost:3000/exams/${examId}`);
    const exam = await response.json();
    const name = prompt('Inserisci il nome dell\'esame:', exam.name);
    const description = prompt('Inserisci la descrizione dell\'esame:', exam.description);
    if (name.trim() === '' || description.trim() === '') {
      alert('I campi name e description non possono essere vuoti');
      return;
    }
    const response2 = await fetch(`http://localhost:3000/exams/${examId}`, {
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
      await updateExamsTable();
    }
    else {
      alert('Errore durante la modifica dell\'esame');
    }
  }
  
  async function handleAddExam() {
    const name = prompt('Inserisci il nome dell\'esame:');
    const description = prompt('Inserisci la descrizione dell\'esame:');
    if (name.trim() === '' || description.trim() === '') {
      alert('I campi name e description non possono essere vuoti');
      return;
    }
    const response = await fetch('http://localhost:3000/exams', {
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
      await updateExamsTable();
    } else {
      alert('Errore durante la creazione dell\'esame');
    }
  }
  
  async function handleDeleteExam(event) {
    const examId = event.target.getAttribute('data-exam-id');
    const confirmation = confirm('Sei sicuro di voler eliminare questo esame?');
    if (confirmation) {
      const response = await fetch(`http://localhost:3000/exams/${examId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        await updateExamsTable();
      } else {
        alert('Errore durante l\'eliminazione dell\'esame');
      }
    }
  }

  const addExamButton = document.getElementById('add-exam-button');
  addExamButton.addEventListener('click', handleAddExam);
  updateExamsTable();