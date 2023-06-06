const { db } = require('../Function/PointCount');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

function findout(message, target) {
    const userRef = db.collection('users').doc(target);
    userRef.get().then((doc) => {
        if (doc.exists) {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('a48bc4')
                .setTitle(doc.data().name + '님의 프로필')
                .setURL('https://comic.naver.com/webtoon/detail?titleId=131385&no=208')
                .setAuthor(
                    '앤젤라',
                    `https://cdn.discordapp.com/avatars/1103319460162572429/d78f669f3ca7ebc20b76d126ed544252.webp?size=80`
                )
                .addFields(
                    { name: 'rank', value: doc.data().rank, inline: true },
                    { name: 'level', value: doc.data().level, inline: true },
                    { name: 'exp', value: doc.data().exp, inline: true }
                )
                .setImage(`https://cdn.discordapp.com/avatars/${doc.id}/${doc.data().avatar}.webp`)
                .setTimestamp()
                .setFooter(
                    '앤젤라',
                    `https://cdn.discordapp.com/avatars/1103319460162572429/d78f669f3ca7ebc20b76d126ed544252.webp?size=80`
                );
            message.channel.send(exampleEmbed);
        } else {
            message.channel.send('!등록을 먼저 진행해주세요.');
        }
    });
}
module.exports = {
    name: '프로필',
    description: '프로필을 확인하는 명령어입니다.\n!등록 = 자신의 프로필, !등록 "SOMEONE" = 누군가의 프로필',
    execute(message, args) {
        const collectionRef = db.collection('users'); // 검색할 컬렉션 이름을 입력하세요
        const query = collectionRef.where('name', '==', `${args}`);
        query
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    findout(message, doc.id);
                });
            })
            .catch((error) => {
                console.log('Error getting documents:', error);
            });
        if (args.length == 0) {
            findout(message, message.author.id);
        }
    },
};
