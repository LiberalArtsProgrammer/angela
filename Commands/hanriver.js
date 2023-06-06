const axios = require('axios');

module.exports = {
    name: '한강물온도',
    description: '한강물온도를 알려주는 실시간 명령어입니다. \n!한강물온도',
    execute(message, args) {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.hangang.msub.kr/', {
                    timeout: 10000,
                });
                message.channel.send('현재 한강 수온은 ' + response.data.temp + '도 입니다.');
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    },
};
