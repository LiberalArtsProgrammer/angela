const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!"
const config = require('./config.json')
const fs = require('fs');
const {PointCount} = require('./Function/PointCount')
client.commands = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
  client.user.setActivity("Lobotomy Corporation", { type: 'PLAYING' });
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
  if(message.author.bot === false)
    PointCount(message)
  if (message.content.startsWith(prefix) && !message.author.bot){
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
      if (!client.commands.has(command)){
        message.reply(`해당 명령어가 존재하지않습니다.\n오류 발생 : ${command}`)
        return;
      }

	    try {
		    client.commands.get(command).execute(message,args);
	    } catch (error) {
	    	message.reply('<@825870507114233916>First Trumpet!');
	    }
  } 
});

client.login(config.token);