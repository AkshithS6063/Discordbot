console.clear();
// import Perm from './perm';
require('dotenv').config();
const Discord = require('discord.js');
// const { Permissions } = require('discord.js');
const config = require('./Data/config.json');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
	const args = message.content.substring(config.prefix.length).split(/ +/);
	if (!message.content.startsWith(config.prefix)) return;
	switch (args[0]) {
	case 'Hello': {
		message.author.send('hello there!!!');
		const perms = message.member.permissions;

		// Check if a member has a specific permission on the guild!
		const has_kick = perms.has('new');
		console.log(has_kick);
		break;
	}

	case 'say':
		message.reply(args.slice(1).join(' '));
	}
});
