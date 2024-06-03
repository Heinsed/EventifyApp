import moment from "moment/moment";
import styled from "styled-components/native";
import mainStore from "../../../stores/MainStore";
import UIStyles from "../../../styles/UI";


const EventCardDate = ({date}) => {
    const day = moment.unix(date.seconds).format('DD') + ' ' + moment.unix(date.seconds).format('MMMM')
    const year = moment.unix(date.seconds).format('YYYY');
    const time = moment.unix(date.seconds).format('HH:mm');
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
    return (
        <EventCardDateText>
            <EventCardDateDay currentTheme={currentTheme}>
                {day}
            </EventCardDateDay>
            <EventCardDateYear currentTheme={currentTheme}>
                {year}
            </EventCardDateYear>
            <EventCardDateTime currentTheme={currentTheme}>
                {time}
            </EventCardDateTime>
        </EventCardDateText>
    )
}

const EventCardDateText = styled.View(() =>({
    flexDirection: 'row',
    gap: 30,
}));

const EventCardDateDay = styled.Text(({currentTheme}) =>({
    fontSize: 13,
    fontFamily: 'MontserratMedium',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
}));

const EventCardDateYear = styled.Text(({currentTheme}) =>({
    fontSize: 13,
    fontFamily: 'MontserratMedium',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
}));

const EventCardDateTime = styled.Text(({currentTheme}) =>({
    fontSize: 13,
    fontFamily: 'MontserratMedium',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
}));

export default EventCardDate;