async function updateRanking(db, message) {
    try {
        const snapshot = await db.collection('users').orderBy('exp', 'desc').get();

        let rank = 1;
        const batch = db.batch();

        snapshot.forEach((doc) => {
            const userData = doc.data();
            const userRef = db.collection('users').doc(doc.id);

            batch.update(userRef, { rank: rank });

            if (userData.rank > rank) {
                batch.update(userRef, { rank: rank });
                message.reply(`${doc.data().name}님의 랭크가 ${rank}위으로 상승!`);
            }

            rank++;
        });

        await batch.commit();
    } catch (error) {
        console.error('Error updating ranking:', error);
        throw error;
    }
}

module.exports = { updateRanking };
