const { Command } = require("../classes.js");

module.exports = class Help extends Command {
  constructor(client) {
    super(client, { name: "help", description: "Shows this message" });
  }
  async run(message, args) {
    const client = message.client;

    let descrip = client.commands
      .map((value, key) => {
        return `:white_check_mark: ${key} - ${value.description}`;
      })
      .join("\n");

    message.channel.send(descrip, { split: "\n" });
  }
};
