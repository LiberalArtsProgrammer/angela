const { db } = require('../Function/PointCount');
const Discord = require('discord.js');

async function getRanking(message) {
    const snapshot = await db.collection('users').orderBy('exp', 'desc').get();
    const ranking = [];
    snapshot.forEach((doc) => {
        const userData = doc.data();
        ranking.push({
            userId: userData.name,
            exp: userData.exp,
        });
    });
    const Embed = new Discord.MessageEmbed()
        .setColor('a48bc4')
        .setTitle('순위표!')
        .setURL('https://comic.naver.com/webtoon/detail?titleId=131385&no=208')
        .setAuthor(
            '앤젤라',
            `https://cdn.discordapp.com/avatars/825870507114233916/3adbc35fc58c9be7d6a6fc776ef414cc.webp`
        )
        .setTimestamp()
        .setFooter(
            '앤젤라',
            `https://cdn.discordapp.com/avatars/825870507114233916/3adbc35fc58c9be7d6a6fc776ef414cc.webp`
        );
    for (let j in ranking) {
        Embed.addField(`${Number(j) + 1}위`, ranking[j].userId);
    }

    message.channel.send(Embed);
}

module.exports = {
    name: '순위',
    description: '서버 속에서 랭킹을 확인하는 명령어입니다.\n!순위',
    execute(message, args) {
        getRanking(message);
    },
};
