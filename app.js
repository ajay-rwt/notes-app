const yargs = require("yargs");
const fs = require("fs");
const notes = require("./notes.js");
const chalk = require("chalk");

// Adding a command to add a new note ksj
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
    notes.addNote(argsv.title, argsv.body);
  },
});

// Adding a command to delete a note
yargs.command({
  command: "delete",
  describe: "Delete a note",
  builder: {
    title: {
      describe: "Title of the note to be deleted",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.deleteNote(argv.title);
  },
});

// Adding a command to find a note by it's title
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
    const foundNote = notes.readNote(argsv.title);

    foundNote !== undefined
      ? console.log(
          chalk.green(
            "\n---------------------------------------------------------------------------------------------------------------\n\n"
          ) +
            chalk.italic.magenta(foundNote.body) +
            chalk.green(
              "\n\n---------------------------------------------------------------------------------------------------------------\n"
            )
        )
      : console.log(chalk.red.inverse.bold("Note not found."));
  },
});

// Adding a command to list all notes
yargs.command({
  command: "list",
  describe: "Get a list of all notes",
  handler: function () {
    const allNotes = notes.listNotes();

    console.log("\n");

    if (allNotes.length > 0) {
      for (let note of allNotes) {
        console.log(
          `\n${chalk.red.inverse("TITLE")} : ${chalk.yellow.inverse(
            note.title
          )}\n\n${chalk.red("BODY")} : ${chalk.magenta.italic(
            note.body
          )}\n${chalk.green(
            "\n---------------------------------------------------------------------------------------------------------------"
          )}`
        );
      }
    } else {
      console.log(chalk.red.bold.inverse("There are no notes yet!!!") + "\n");
    }
  },
});

yargs.argv;
