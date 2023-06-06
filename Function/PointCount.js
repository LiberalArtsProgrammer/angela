const admin = require('firebase-admin');
const serviceAccount = require('../angela-lob-firebase-adminsdk-rau52-2ff672c6bb.json');
const { RandomMachine } = require('./Random');
const { updateRanking } = require('./Ranking');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore(); //DB 설정

function PointCount(message) {
    updateRanking(db, message); //실시간 랭킹
    const userRef = db.collection('users').doc(message.author.id);
    // 데이터 조회하기
    userRef.get().then((doc) => {
        if (doc.exists) {
            const NowLevel = Math.floor(Math.sqrt(doc.data().exp));
            if (!(doc.data().level === NowLevel)) {
                //레벨 상승
                userRef.update({
                    level: NowLevel,
                });
                message.reply(`${doc.data().name}님 축하합니다. ${NowLevel}레벨이 되었습니다!`);
            }

            userRef.update({
                exp: doc.data().exp + RandomMachine(),
            });
        } else {
            message.channel.send('!등록을 먼저 진행해주세요.');
        }
    });
}

module.exports = {
    db: db,
    PointCount: PointCount,
};
