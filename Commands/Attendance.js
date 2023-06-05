const { db } = require('../Function/PointCount')

module.exports = {
	name: '출첵',
	description: '출첵 명령어.',
	async execute(message, args) {
		//const today = new Date().toISOString().split('T')[0];
		const today = "2023-06-05"
		const docRef = db.collection('users').doc(message.author.id);
		const doc = await docRef.get();
		console.log(today)
		const data = doc.data();
		if (data.timestamp == today) {
			message.channel.send("이미 출석체크를 하셨습니다.");
		} else {
			docRef.update({
				timestamp: today,
				exp: data.exp + 100
			  });
			  message.channel.send("출석 체크완료!, 100점 추가!");
		}
	},
  };