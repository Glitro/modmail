module.exports = {
  colours: {
    red: "#32cd32",
    blue: "#0099ff",
    purple: "#6a0dad"
  },

  functions: {
    dm: async function(message) {
      if (message.author.bot) return;
      let thread = await message.client.models.threads.findOne({
        recipient: message.author.id
      });
      console.log(thread);
      let log = await message.client.models.logs.findOne({});
      if (log) {
        if (thread) {
          if (thread.open) {
            thread.messages.push({
              content: message.content,
              attachments: message.attachments.array(),
              author: message.author.id
            });
            (await message.client.channels.fetch(thread.channel)).send(
              `__RECIPIENT__ **${message.author.username}** => ${
                message.content ? message.content : ""
              }`,
              message.attachments.array()
            );
            message.react("✅");
            thread.updated = true;
            await thread.save();
          } else {
            module.exports.functions.createThread(message);
          }
        } else {
          module.exports.functions.createThread(message);
        }
      } else {
        return message.author.send(
          "The guild does not have the ModMail setup yet. Please ask an admin to run the `setup` command"
        );
      }
    },
    createThread: async function(message) {
      let log = await message.client.models.logs.findOne({});
      (await message.client.channels.fetch(log.logs)).guild.channels
        .create(message.author.username, {
          type: "text",
          topic: `ModMail thread for ${message.author.tag} (${message.author.id})`,
          parent: await message.client.channels.fetch(log.category),
          permissionOverwrites: [
            {
              id: (await message.client.channels.fetch(log.logs)).guild.roles
                .everyone,
              deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
            },
            {
              id: log.supportRole,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
            },
            {
              id: message.author.id,
              deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            }
          ],
          reason: `${message.author.tag} opened a new thread`
        })
        .then(async channel => {
          const thread = {
            recipient: message.author.id,
            open: true,
            messages: [
              {
                content: message.content,
                attachments: message.attachments.array(),
                author: message.author.id
              }
            ],
            channel: channel.id,
            remind: false,
            mod: ""
          };
          await new message.client.models.threads(thread).save();
          message.channel.send(
            "Your message has been sent. Please be patient while the mods prepare to reply"
          );
          channel.send(
            `__RECIPIENT__ **${message.author.username}** => ${
              message.content ? message.content : ""
            }`,
            message.attachments.array()
          );
        });
    }
  }
};
