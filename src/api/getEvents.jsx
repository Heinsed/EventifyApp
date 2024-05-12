// import axios from 'axios';
import eventData from './events.json';



// const fetchEventData = async () => {
//     try {
//         const response = await axios.get(apiUrl);
//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

const fetchEventData = async () => {
    try {
        return eventData;
    } catch (error) {
        throw new Error(error);
    }
};

export { fetchEventData };

