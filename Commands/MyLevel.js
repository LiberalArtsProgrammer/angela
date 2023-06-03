const { db } = require('../Function/PointCount')
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	name: '레벨',
	description: '레벨 명렁어.',
	execute(message, args) {
		const userRef = db.collection('users').doc(message.author.id);
		userRef.get().then(doc => {
			if (doc.exists) {
				const exampleEmbed = new Discord.MessageEmbed()
				.setColor('a48bc4')
				.setTitle(message.author.username + '님의 프로필')
				.setURL('https://comic.naver.com/webtoon/detail?titleId=131385&no=208')
				.setAuthor('앤젤라', `https://cdn.discordapp.com/avatars/825870507114233916/3adbc35fc58c9be7d6a6fc776ef414cc.webp`)
				.addFields(
					{ name: 'rank', value: doc.data().rank, inline: true },
					{ name: 'level', value: doc.data().level, inline: true },
					{ name: 'exp', value: doc.data().exp, inline: true },
				)
				.setImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`)
				.setTimestamp()
				.setFooter('앤젤라', `https://cdn.discordapp.com/avatars/825870507114233916/3adbc35fc58c9be7d6a6fc776ef414cc.webp`);
				message.channel.send(exampleEmbed);
			} else {
				message.channel.send("!등록을 먼저 진행해주세요.")
			}
		  });
	},
};