const fs = require("fs");
const chalk = require("chalk");

function addNote(title, body) {
  console.log("Checking if the note already exists...");

  const foundNote = readNote(title);

  if (foundNote === undefined || foundNote === null) {
    console.log("Verified, not a duplicate note title. Adding a new note...");
    const notes = loadNotes();
    notes.push({ title, body });
    saveNotes(notes);
    console.log("Note saved.");
  } else {
    console.log(
      chalk.red.inverse.bold("\nNote with given title already exists!!!\n") +
        chalk.whiteBright("\nFound note : ") +
        chalk.green(
          "\n---------------------------------------------------------------------------------------------------------------\n"
        ) +
        `\n${chalk.red.inverse("TITLE")} : ${chalk.yellow.inverse(
          foundNote.title
        )}\n\n${chalk.red("BODY")} : ${chalk.magenta.italic(
          foundNote.body
        )}\n${chalk.green(
          "\n---------------------------------------------------------------------------------------------------------------"
        )}` +
        chalk.green.inverse.italic.bold(
          "\n\nPlease use a different title to add the note.\n"
        )
    );
  }
}

function deleteNote(title) {
  console.log("Deleting the note...");

  const notes = loadNotes();

  const filteredNotes = notes.filter((note) => note.title !== title);

  saveNotes(filteredNotes);

  console.log(chalk.green.inverse.bold("\nNote deleted.\n"));
}

function listNotes() {
  console.log("Fetching all notes...");
  return loadNotes();
}

function readNote(title) {
  console.log("Finding the note...");

  const notes = loadNotes();

  const foundNote = notes.find((note) => note.title === title);

  return foundNote;
}

function loadNotes() {
  try {
    const bufferedData = fs.readFileSync("notes.json");
    return JSON.parse(bufferedData.toString());
  } catch (error) {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
}

module.exports = {
  addNote,
  deleteNote,
  listNotes,
  readNote,
};

// test
