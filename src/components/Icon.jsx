import MapIcon from '@iconscout/react-native-unicons/icons/uil-map';
import UserIcon from '@iconscout/react-native-unicons/icons/uil-user';
import CalendarIcon from '@iconscout/react-native-unicons/icons/uil-calendar-alt';
import SearchIcon from '@iconscout/react-native-unicons/icons/uil-search';
import CloseIcon from '@iconscout/react-native-unicons/icons/uil-multiply';
const Icon = ({iconType, color, size}) =>{
    return(
        <>
            {
                iconType === 'map' ?
                    <MapIcon color={color} size={size} />
                    : iconType === 'user' ?
                        <UserIcon color={color} size={size} />
                        : iconType === 'calendar' ?
                            <CalendarIcon color={color} size={size} />
                            : iconType === 'search' ?
                                <SearchIcon color={color} size={size} />
                                : iconType === 'close' ?
                                    <CloseIcon color={color} size={size} />
                    :

                    null
            }
        </>
    )
}

export default Icon;