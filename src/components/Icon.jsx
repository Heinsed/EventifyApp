import MapIcon from '@iconscout/react-native-unicons/icons/uil-map';
import UserIcon from '@iconscout/react-native-unicons/icons/uil-user';
import CalendarIcon from '@iconscout/react-native-unicons/icons/uil-calendar-alt';
import SearchIcon from '@iconscout/react-native-unicons/icons/uil-search';
import CloseIcon from '@iconscout/react-native-unicons/icons/uil-multiply';
import FilterIcon from '@iconscout/react-native-unicons/icons/uil-filter';
import TimeIcon from '@iconscout/react-native-unicons/icons/uil-clock-eight';
import LocationIcon from '@iconscout/react-native-unicons/icons/uil-map-marker';
import WishlistIcon from '@iconscout/react-native-unicons/icons/uil-heart';

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
                                    : iconType === 'filter' ?
                                        <FilterIcon color={color} size={size} />
                                        : iconType === 'time' ?
                                            <TimeIcon color={color} size={size} />
                                            : iconType === 'location' ?
                                                <LocationIcon color={color} size={size} />
                                                : iconType === 'wishlist' ?
                                                    <WishlistIcon color={color} size={size} />
                    :

                    null
            }
        </>
    )
}

export default Icon;