import firestore from '@react-native-firebase/firestore';

const fetchEvents = async (lastVisible = null) => {
    try {
        let query = firestore().collection('events').orderBy('date', 'desc').limit(3);

        if (lastVisible) {
            query = query.startAfter(lastVisible);
        }

        const data = await query.get();
        const eventsData = await Promise.all(data.docs.map(async doc => {
            const eventData = doc.data();
            const categoryRef = eventData.category;

            const categorySnapshot = await categoryRef.get();

            return { id: doc.id, ...eventData, category: categorySnapshot.id };
        }));

        const lastDoc = data.docs[data.docs.length - 1];

        return { events: eventsData, lastVisible: lastDoc };
    } catch (error) {
        throw new Error(error);
    }
};

export { fetchEvents };
