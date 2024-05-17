import firestore from '@react-native-firebase/firestore';




const fetchEvents = async () => {
    try {
        const data = await firestore().collection('events').get();
        const eventsData = await Promise.all(data.docs.map(async doc => {
            const eventData = doc.data();
            const categoryRef = eventData.category;

            const categorySnapshot = await categoryRef.get();

            return { id: doc.id, ...eventData, category: categorySnapshot.id };
        }));
        return (eventsData);

    } catch (error) {
        throw new Error(error);
    }
};

export { fetchEvents };

