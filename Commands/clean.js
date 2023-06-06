module.exports = {
    name: '청소',
    description: '서버에 보내진 메세지를 청소하는 명령어입니다. \n!청소(메세지관리권한필요)',
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('권한이 없습니다.');
        }
        console.log(Number(args));
        message.channel
            .bulkDelete(Number(args))
            .then(() => message.channel.send(`${args}개의 메세지를 삭제했습니다.`))
            .catch(console.error);
    },
};
