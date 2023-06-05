const { db } = require('../Function/PointCount')

module.exports = {
	name: '등록',
	description: '등록 명령어.',
	execute(message, args) {
		const docRef = db.collection('users').doc(message.author.id);
		docRef.set({
		  name: message.author.username,
		  exp: 1,
		  level: 1,
		  avatar : message.author.avatar
		});
		message.channel.send("계정 등록이 완료되었습니다.")
		message.channel.send("계정 등록, 1점 추가!")
	},
};