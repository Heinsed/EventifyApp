import firestore from '@react-native-firebase/firestore';

const fetchEvents = async (lastVisible = null, searchQuery = '', selectedCategories = []) => {
    try {
        let query = firestore().collection('events');


        if (searchQuery) {
            query = query.where('title', '>=', searchQuery).where('title', '<=', searchQuery + '\uf8ff');
        }

        if (selectedCategories.length > 0) {
            const categoryRefs = selectedCategories.map(categoryId => firestore().collection('events_categories').doc(categoryId));
            console.log('Category Refs:', categoryRefs);
            if (searchQuery) {
                query = query.where('title', '>=', searchQuery).where('title', '<=', searchQuery + '\uf8ff').where('category', 'in', categoryRefs);
            }else{
                query = query.where('category', 'in', categoryRefs);
            }
        }


        if (lastVisible) {
            query = query.startAfter(lastVisible);
        }


        const snapshot = await query.limit(3).get();

        if (snapshot.empty) {
            return { events: [], lastVisible: null };
        }

        const eventsData = snapshot.docs.map(doc => {
            const eventData = doc.data();
            return { id: doc.id, ...eventData };
        });

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];

        return { events: eventsData, lastVisible: lastDoc };
    } catch (error) {
        throw new Error(error.message);
    }
};

export { fetchEvents };
