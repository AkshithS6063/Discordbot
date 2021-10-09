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


client.on('guildMemberAdd', member => {
	member.send('welcome to the channel');

	// const everyoneRole = member.guild.roles.cache.find(
	// 	(r) => r.name === '@Student',
	// );

	// member.guild.channels.create('channel name', {
	// 	type: 'text',
	// 	permissionOverwrites: [
	// 		{
	// 			id: everyoneRole.id,
	// 			deny: ['VIEW_CHANNEL'],
	// 		},
	// 	],
	// });
});

async function rolePerm(message) {
	console.log('called');
	const person = 'Student';
	// console.log(person.toLowerCase());
	const pp = person.toLowerCase();
	const role = message.guild.roles.cache.find(r => r.name === pp);
	const member = message.member;
	member.roles.add(role).catch(console.error);
	if (pp) {
		message.guild.channels.create('student', {
			type: 'text',
			permissionOverwrites: [
				{
					id: message.guild.id,
					allow: ['VIEW_CHANNEL'],
				},
			],
		});
	}
}

client.on('messageCreate', (message) => {
	const args = message.content.substring(config.prefix.length).split(/ +/);
	if (!message.content.startsWith(config.prefix)) return;
	switch (args[0]) {
	case 'hello': {
		message.author.send('hello there!!!');
		break;
	}
	case 'verify': {
		message.author.send('link to form');
		rolePerm(message);
		break;
	}
	case 'say':
		message.reply(args.slice(1).join(' '));
	}
});

// process.on('unhandledRejection', (error) => {
// 	console.error('Unhandled promise rejection:', error);
// });
// const member = message.guild.members.cache.get('524594326353739776');
// if (member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
// 	console.log('This member can kick');
// }

// if (
// 	member.permissions.has([
// 		Permissions.FLAGS.KICK_MEMBERS,
// 		Permissions.FLAGS.BAN_MEMBERS,
// 	])
// ) {
// 	console.log('This member can kick and ban');
// }

// if (member.permissions.has(Permissions.FLAGS.KICK_MEMBERS, false)) {
// 	console.log('This member can kick without allowing admin to override');
// }

// const everyoneRole = message.guild.roles.cache.find(
//   (r) => r.name === "@Student"
// );

// message.guild.channels.create("student", {
//   type: "text",
//   permissionOverwrites: [
//     {
//       id: everyoneRole.id,
//       allow: ["VIEW_CHANNEL"],
//     },
//   ],
// });
client.login(process.env.DTOKEN);