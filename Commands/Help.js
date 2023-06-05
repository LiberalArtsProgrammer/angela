const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();

module.exports = {
	name: '도움말',
	description: '도움말 명령어.',
	execute(message, args) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
	    const command = require(`../commands/${file}`);
	    client.commands.set(command.name, command);
    }
    if(args == ""){
      message.channel.send(this.description)
    } else {
      if (!client.commands.has(args[0])){
        message.reply(`해당 명령어가 존재하지않습니다.`)
        return;
      }
      try {
        message.channel.send(client.commands.get(args[0]).description);
      } catch (error) {
        message.reply('<@825870507114233916>First Trumpet!');
      }
    }
	},
};