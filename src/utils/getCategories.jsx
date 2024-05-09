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



export { getCategories };

