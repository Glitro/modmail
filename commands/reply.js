const { Command } = require("../classes.js");

module.exports = class Reply extends Command {
  constructor(client) {
    super(client, {
      name: "reply",
      description: "Reply to a ModMail thread",
      aliases: ["r"]
    });
  }
  async run(message, args) {
    let thread = await message.client.models.threads.findOne({
      channel: message.channel.id
    });
    let log = await message.client.models.logs.findOne({});
    if (thread) {
      if (thread.mod == message.author.id) {
        (await message.client.users.fetch(thread.recipient)).send(
          `__MODERATOR__ **${message.author.username}** => ${
            args[0] ? args.join(" ") : ""
          }`,
          message.attachments.array()
        );
        thread.messages.push(message);
        message.channel.send("Message Sent");
      } else if (thread.mod == "") {
        thread.mod = message.author.id;
        await (await message.client.users.fetch(thread.recipient))
          .send(
            `__SYSTEM__ => Your thread is now being handled by **${message.author.username}**`
          )
          .catch(() => {
            return message.channel.send("Message Failed to send");
          });
        (await message.client.users.fetch(thread.recipient)).send(
          `__MODERATOR__ **${message.author.username}** => ${
            args[0] ? args.join(" ") : ""
          }`,
          message.attachments.array()
        );
        
        message.channel.createOverwrite(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true,
          VIEW_CHANNEL: true
        });
        message.channel.createOverwrite(log.supportRole, {
          VIEW_CHANNEL: true,
          READ_MESSAGE_HISTORY: true,
          SEND_MESSAGE: false
        });
        
        thread.messages.push({
          content: message.content,
          attachments: message.attachments.array(),
          author: message.author.id
        });
        message.channel.send("Message Sent");
      } 
      thread.updated = true;
      await thread.save();
    } else {
      return message.channel.send("This command can only be used in a Thread");
    }
  }
};
