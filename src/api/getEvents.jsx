import axios from 'axios';


const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Up6v1Uny6W3wWgJ4RlpJDVCOUOAA3czw';

const fetchEventData = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        throw new Error('err');
    }
};

export { fetchEventData };

