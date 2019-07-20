import {admincheck} from '../../modules/admincheck';

export const config = {
  name: 'kick',
  aliases: [],
  description: 'Kicks the @mentioned user',
};

export const run = async (bot, message, args) => {
  admincheck(message);
  message.delete(0);

  let mentionedUser = message.mentions.users.first();
  let suppliedReason =
    args.slice(1).join(' ') ||
    `${message.author.username} did not supply reason.`;
  let kickLog = `${message.author.username}: ${suppliedReason}`;

  if (!mentionedUser) {
    message.channel
      .send(`Sorry ${message.author.username}, I couldn't find that user!`)
      .then(message => {
        message.delete(5000);
      });
    return;
  }

  message.guild
    .member(mentionedUser)
    .kick(kickLog)
    .then(console.log)
    .catch(console.error);
};
