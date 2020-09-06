const yargs = require("yargs");
const fs = require("fs");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Title of the note to be added",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Contents of the note to be added",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argsv) {
    let note = {
      title: argsv.title,
      body: argsv.body,
    };

    const fileContentsBuffer = fs.readFileSync("notes.json");
    const notesJson = fileContentsBuffer.toString();

    if (!notesJson) {
      fs.writeFileSync("notes.json", "[" + JSON.stringify(note) + "]");
    } else {
      if (notesJson[notesJson.length - 1] !== "\n")
        fs.writeFileSync(
          "notes.json",
          notesJson.substr(0, notesJson.length - 1) +
            "," +
            JSON.stringify(note) +
            "]"
        );
      else
        fs.writeFileSync(
          "notes.json",
          notesJson.substr(0, notesJson.length - 2) +
            "," +
            JSON.stringify(note) +
            "]"
        );
    }
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Title of the note to be fetched",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argsv) {
    let bufferedNotes = fs.readFileSync("notes.json");
    const notes = JSON.parse(bufferedNotes.toString());
    console.log(notes.find((note) => note.title === argsv.title).body);
  },
});

yargs.argv;
