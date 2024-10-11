document.addEventListener('DOMContentLoaded', function() {
    const newNoteBtn = document.getElementById('newNoteBtn');
    const cancelNoteBtn = document.getElementById('cancelNoteBtn');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const notesContainer = document.getElementById('notesContainer');
    const noteSection = document.getElementById('noteSection');
    const noteText = document.getElementById('noteText');
    let editingNoteId = null;
  
    // Mock notes storage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    // Render existing notes
    function renderNotes() {
      notesContainer.innerHTML = '';
      notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'col note-card';
        noteCard.innerHTML = `
          <div class="card-body">
            <p>${note.text}</p>
            <button class="btn btn-sm btn-warning" onclick="editNote(${index})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteNote(${index})">Delete</button>
          </div>
        `;
        notesContainer.appendChild(noteCard);
      });
    }
  
    // Show new note section
    newNoteBtn.addEventListener('click', () => {
      noteSection.style.display = 'block';
      noteText.value = '';
      editingNoteId = null;
    });
  
    // Cancel note creation/edit
    cancelNoteBtn.addEventListener('click', () => {
      noteSection.style.display = 'none';
    });
  
    // Save or edit note
    saveNoteBtn.addEventListener('click', () => {
      const noteContent = noteText.value;
      if (editingNoteId !== null) {
        notes[editingNoteId].text = noteContent;
      } else {
        notes.push({ text: noteContent });
      }
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes();
      noteSection.style.display = 'none';
    });
  
    // Edit note function
    window.editNote = function(index) {
      noteText.value = notes[index].text;
      noteSection.style.display = 'block';
      editingNoteId = index;
    };
  
    // Delete note function
    window.deleteNote = function(index) {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes();
    };
  
    // Initial render
    renderNotes();
  });
  