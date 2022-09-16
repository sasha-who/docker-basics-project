const createNoteElement = (note) => {
  const notesContainerElement = document.querySelector(".notes-container");
  const newNoteElement = document.createElement("p");

  newNoteElement.append(note.text);
  notesContainerElement.append(newNoteElement);
};

(async () => {
  // Fetch existing notes and mount them on page
  const response = await fetch("/notes");
  const notes = await response.json();

  for (const note of notes) {
    createNoteElement(note);
  }

  // Send a new note to a server
  const addButtonElement = document.getElementById("add-button");
  const inputElement = document.getElementById("text-input");

  addButtonElement.addEventListener("click", (async () => {
    const note = { text: inputElement.value };
    inputElement.value = "";

    const response = await fetch("/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(note)
    })

    if (response) {
      createNoteElement(note)
    }    
  }));
})();