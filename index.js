// declaring all the needed modules and files
const express = require("express");
const app = express();
const config = require("./config.js");
const mongoose = require("mongoose");
const fs = require("fs");
const Discord = require("discord.js");
const path = require("path");

app.use(express.static("public")); // these lines are the web server.
app.get("/", function(request, response) { // they are used for 24/7 hosting
  response.sendStatus(200); // if you do not use a VPS
});
app.listen(process.env.PORT); // or some other server already

// client defintions to be access from any other file in this repo
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
global.client = client;

// the event handler - for cleaner code. event files found in the event folder
fs.readdir("./events", async (err, files) => {
  if (err) return console.error(err);
  const eventFiles = files.filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.emitter == "discord")
      client.once(event.name, (...args) => event.run(...args));
    else if (event.emitter == "process")
      process.once(event.name, (...args) => event.run(...args));
  }
});

// login to the discord client
client.login(config.token)
