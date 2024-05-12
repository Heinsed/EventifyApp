import moment from "moment/moment";
import styled from "styled-components/native";


const EventCardDate = ({date}) => {
    const day = moment.unix(date.seconds).format('DD') + ' ' + moment.unix(date.seconds).format('MMMM')
    const year = moment.unix(date.seconds).format('YYYY');
    const time = moment.unix(date.seconds).format('HH:mm');
    return (
        <EventCardDateText>
            <EventCardDateDay>
                {day}
            </EventCardDateDay>
            <EventCardDateYear>
                {year}
            </EventCardDateYear>
            <EventCardDateTime>
                {time}
            </EventCardDateTime>
        </EventCardDateText>
    )
}

const EventCardDateText = styled.View(() =>({
    flexDirection: 'row',
    gap: 30,
}));

const EventCardDateDay = styled.Text(() =>({
    fontSize: 13,
    fontFamily: 'MontserratMedium',
}));

const EventCardDateYear = styled.Text(() =>({
    fontSize: 13,
    fontFamily: 'MontserratMedium',
}));

const EventCardDateTime = styled.Text(() =>({
    fontSize: 13,
    fontFamily: 'MontserratMedium',
}));

export default EventCardDate;