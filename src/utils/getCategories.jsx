import firestore from '@react-native-firebase/firestore';




const getCategories = async () => {
    try {
        const data = await firestore().collection('events_categories').get();
        const categoriesData = await Promise.all(data.docs.map(async doc => {
            const categoryData = doc.data();
            return { id: doc.id, ...categoryData };
        }));

        return (categoriesData);



    } catch (error) {
        throw new Error(error);
    }
};


const getCategoryForEvent = async (eventId) => {
    try {
        // Получаем документ ивента
        const eventDoc = await firestore().collection('events').doc(eventId).get();

        if (eventDoc.exists) {
            const eventData = eventDoc.data();
            const categoryRef = eventData.categoryRef;

            if (categoryRef && categoryRef._documentPath && categoryRef._documentPath._parts) {
                // Получаем путь категории из _documentPath._parts
                const categoryPath = categoryRef._documentPath._parts.join('/');

                // Получаем документ категории по пути
                const categoryDoc = await firestore().doc(categoryPath).get();

                if (categoryDoc.exists) {
                    return categoryDoc.data();
                } else {
                    console.log('Category does not exist');
                    return null;
                }
            } else {
                console.log('Invalid category reference');
                return null;
            }
        } else {
            console.log('Event does not exist');
            return null;
        }
    } catch (error) {
        console.error("Error getting category: ", error);
    }
};


export { getCategories, getCategoryForEvent };

