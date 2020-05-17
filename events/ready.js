// declaring files/modules/client
const client = global.client;
const fs = require("fs");
const mongoose = require("mongoose");
const config = require("../config.js");

// event - ready
// emitter - Discord Client
module.exports = {
  name: "ready",
  emitter: "discord",
  run: async function() {
  // set the bot's status
    client.user.setActivity(`for DMs`, {
      type: "WATCHING"
    });

    // command handler/loader - command files in the `commands` folder
    fs.readdir("./commands", async (err, files) => {
      if(err) return client.emit("error", err);
      const commandFiles = files.filter(file => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if (!command.name || command.name.length < 1) continue; // if a name is not specified, do not load it
        client.commands.set(command.name, command); // load all commands to be used by the message event/commands

        if (!command.aliases || command.aliases.length < 1) continue; // if there are no aliases, do not load any
        command.aliases.forEach(alias => {
          client.aliases.set(alias, command.name); // load all aliases to be used by the message event/commands
        });
      }
    });

    try {
      mongoose.connect(
        config.mongo.connectionString,
        config.mongo.options
      ); // connect to the mongoDB cluster
    } catch (err) {
      return console.error(err);
    }
  }
};
