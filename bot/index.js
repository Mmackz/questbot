const { Events } = require("discord.js");
const { client } = require("./config");
const { shouldDelete } = require("./modules/moderation")
require("dotenv").config();

client.on(Events.ClientReady, (client) => {
   console.log(`Signed in as ${client.user.tag}`);   
});

client.on(Events.MessageCreate, async (message) => {
   if (message.member) {
      const joinedAt = message.member.joinedAt;
      const now = new Date();
      const diffTime = Math.abs(now - joinedAt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      console.log(`${message.member.user.tag} has been a member of ${message.member.guild.name} for ${diffDays} days.`);
      if (diffDays > 30) {
         if (shouldDelete(message)) {
            console.log(message.content);
            await message.delete();
            console.log("message deleted");
         }
      }
   }
   
});

client.login(process.env.DISCORD_TOKEN_DEV);
