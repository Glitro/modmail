const { Event } = require("../classes.js");

module.exports = class Message extends Event {
  constructor(client) {
    super(client, { name: "message", emitter: client });
  }
  async run(message) {
    const client = message.client;
    
    if (message.channel.type == "dm") this.client.data.functions.dm(message);
    if (!message.content.toLowerCase().startsWith(client.config.prefix)) return;

    const args = message.content
      .slice(message.client.config.prefix.length)
      .split(" ");
    const commandName = args.shift().toLowerCase();

    if (message.channel.type == "text") {
      let cmd = this.client.commands.find(
        e => e.name == commandName || e.aliases.includes(commandName)
      );
      if (!cmd) return;
      await cmd.run(message, args);
    }
  }
};
