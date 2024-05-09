import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

const getCurrentUser = async () => {
    try {
        const currentUser = auth().currentUser;
        if (currentUser) {
            const fetchedUser = await firestore().collection("users").doc(currentUser.phoneNumber).get();
            return fetchedUser.data();
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export { getCurrentUser };