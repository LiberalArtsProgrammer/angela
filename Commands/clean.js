module.exports = {
	name: '청소',
	description: '청소 명령어.',
	execute(message, args) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("권한이 없습니다.");
		}
		console.log(Number(args))
		message.channel.bulkDelete(Number(args))
					.then(() => message.channel.send(`${args}개의 메세지를 삭제했습니다.`))
					.catch(console.error)


	},
};