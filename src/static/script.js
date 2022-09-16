(async () => {
  // Fetch existing notes and mount them on page
  const response = await fetch("/notes");
  const notes = await response.json();
  const notesContainerElement = document.querySelector(".notes-container");

  for (const note of notes) {
    const newNoteElement = document.createElement("p");

    newNoteElement.append(note.text);
    notesContainerElement.append(newNoteElement);
  }
})();